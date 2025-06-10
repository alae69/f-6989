
import express from 'express';
import { pool, isDatabaseConnected } from '../config/database.js';
import { fallbackUsers } from '../data/fallbackData.js';

const router = express.Router();

// Authentication routes
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });
    
    let user = null;
    
    if (isDatabaseConnected) {
      // Try to find user by username or email in database
      const result = await pool.query(
        'SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2',
        [username, password]
      );
      
      if (result.rows.length > 0) {
        user = result.rows[0];
        // Update last login
        await pool.query(
          'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
          [user.id]
        );
      }
    } else {
      // Fallback to in-memory users
      user = fallbackUsers.find(u => 
        (u.username === username || u.email === username) && u.password === password
      );
    }
    
    if (user) {
      console.log('Login successful for user:', user.username);
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status
        }
      });
    } else {
      console.log('Login failed for username:', username);
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

export default router;
