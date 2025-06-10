
import express from 'express';
import { pool, isDatabaseConnected } from '../config/database.js';
import { fallbackProperties } from '../data/fallbackData.js';

const router = express.Router();

// Properties routes
router.get('/', async (req, res) => {
  try {
    if (!isDatabaseConnected) {
      return res.json(fallbackProperties);
    }
    const result = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.json(fallbackProperties);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isDatabaseConnected) {
      const property = fallbackProperties.find(p => p.id == id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      return res.json(property);
    }
    
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching property:', error);
    const property = fallbackProperties.find(p => p.id == req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: 'Property not found' });
    }
  }
});

router.post('/', async (req, res) => {
  try {
    if (!isDatabaseConnected) {
      const newProperty = {
        id: fallbackProperties.length + 1,
        ...req.body,
        created_at: new Date().toISOString(),
        status: 'approved',
        featured: req.body.featured || false
      };
      fallbackProperties.push(newProperty);
      return res.status(201).json(newProperty);
    }
    
    const { title, description, price, location, city, bedrooms, bathrooms, image_url, amenities, featured, status } = req.body;
    
    const result = await pool.query(
      'INSERT INTO properties (title, description, price, location, city, bedrooms, bathrooms, image_url, amenities, featured, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [title, description, price, location, city, bedrooms, bathrooms, image_url, amenities, featured || false, status || 'approved']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
