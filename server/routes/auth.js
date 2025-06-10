
import express from 'express';
import bcrypt from 'bcrypt';
import { pool, isDatabaseConnected } from '../config/database.js';
import { fallbackUsers } from '../data/fallbackData.js';

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, phone } = req.body;
    console.log('Registration attempt:', { username, email, name });

    // Basic validation
    if (!username || !email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = null;

    if (isDatabaseConnected) {
      try {
        // Check if user already exists
        const existingUser = await pool.query(
          'SELECT id FROM users WHERE username = $1 OR email = $2',
          [username, email]
        );

        if (existingUser.rows.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Username or email already exists'
          });
        }

        // Create new user
        const result = await pool.query(
          'INSERT INTO users (username, email, password, name, phone, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email, name, role, status, created_at',
          [username, email, hashedPassword, name, phone || '', 'customer', 'active']
        );
        
        user = result.rows[0];
      } catch (dbError) {
        console.error('Database error during registration:', dbError);
        if (dbError.code === '23505') { // Unique constraint violation
          return res.status(400).json({
            success: false,
            message: 'Username or email already exists'
          });
        }
        throw dbError;
      }
    } else {
      // Fallback mode
      const existingUser = fallbackUsers.find(u => 
        u.username === username || u.email === email
      );

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists'
        });
      }

      user = {
        id: fallbackUsers.length + 1,
        username,
        email,
        password: hashedPassword,
        name,
        phone: phone || '',
        role: 'customer',
        status: 'active',
        created_at: new Date().toISOString()
      };
      
      fallbackUsers.push(user);
    }

    console.log('Registration successful for user:', user.username);
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// Login route with password hashing
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });
    
    let user = null;
    
    if (isDatabaseConnected) {
      // Try to find user by username or email in database
      const result = await pool.query(
        'SELECT * FROM users WHERE (username = $1 OR email = $1)',
        [username]
      );
      
      if (result.rows.length > 0) {
        const dbUser = result.rows[0];
        
        // Check password
        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        
        if (passwordMatch) {
          user = dbUser;
          // Update last login
          await pool.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
          );
        }
      }
    } else {
      // Fallback to in-memory users
      const fallbackUser = fallbackUsers.find(u => 
        u.username === username || u.email === username
      );
      
      if (fallbackUser) {
        // Check password (handle both hashed and plain text for backwards compatibility)
        let passwordMatch = false;
        
        if (fallbackUser.password.startsWith('$2b$') || fallbackUser.password.startsWith('$2a$')) {
          // Hashed password
          passwordMatch = await bcrypt.compare(password, fallbackUser.password);
        } else {
          // Plain text password (for existing fallback users)
          passwordMatch = fallbackUser.password === password;
        }
        
        if (passwordMatch) {
          user = fallbackUser;
        }
      }
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
