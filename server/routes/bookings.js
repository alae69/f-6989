
import express from 'express';
import { pool, isDatabaseConnected } from '../config/database.js';
import { fallbackBookings } from '../data/fallbackData.js';

const router = express.Router();

// Bookings routes
router.get('/', async (req, res) => {
  try {
    if (!isDatabaseConnected) {
      return res.json(fallbackBookings);
    }
    
    const result = await pool.query(`
      SELECT b.*, p.title as property_title 
      FROM bookings b 
      JOIN properties p ON b.property_id = p.id 
      ORDER BY b.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.json(fallbackBookings);
  }
});

router.post('/', async (req, res) => {
  try {
    if (!isDatabaseConnected) {
      const newBooking = {
        id: fallbackBookings.length + 1,
        ...req.body,
        created_at: new Date().toISOString(),
        status: 'pending'
      };
      fallbackBookings.push(newBooking);
      return res.status(201).json(newBooking);
    }
    
    const { property_id, guest_name, guest_email, check_in, check_out, guests, total_price } = req.body;
    
    const result = await pool.query(
      'INSERT INTO bookings (property_id, guest_name, guest_email, check_in, check_out, guests, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [property_id, guest_name, guest_email, check_in, check_out, guests, total_price]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
