import express from 'express';
import bcrypt from 'bcrypt';
import { pool, isDatabaseConnected } from '../config/database.js';
import { fallbackUsers } from '../data/fallbackData.js';

const router = express.Router();

// Users routes
router.get('/', async (req, res) => {
  try {
    if (!isDatabaseConnected) {
      return res.json(fallbackUsers.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        name: u.name,
        phone: u.phone,
        role: u.role,
        status: u.status,
        registeredDate: u.created_at.split('T')[0],
        lastLogin: u.last_login || '-'
      })));
    }
    
    const result = await pool.query('SELECT id, username, email, name, phone, role, status, created_at, last_login FROM users ORDER BY created_at DESC');
    const users = result.rows.map(user => ({
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      role: user.role,
      status: user.status,
      registeredDate: user.created_at.toISOString().split('T')[0],
      lastLogin: user.last_login ? user.last_login.toISOString().split('T')[0] : '-'
    }));
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.json(fallbackUsers);
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, email, password, name, phone, role, status } = req.body;
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    if (!isDatabaseConnected) {
      const newUser = {
        id: fallbackUsers.length + 1,
        username,
        email,
        password: hashedPassword,
        name,
        phone: phone || '',
        role: role || 'customer',
        status: status || 'active',
        created_at: new Date().toISOString(),
        last_login: null
      };
      fallbackUsers.push(newUser);
      return res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
        registeredDate: newUser.created_at.split('T')[0],
        lastLogin: '-'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO users (username, email, password, name, phone, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email, name, phone, role, status, created_at, last_login',
      [username, email, hashedPassword, name, phone || '', role || 'customer', status || 'active']
    );
    
    const user = result.rows[0];
    res.status(201).json({
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      status: user.status,
      registeredDate: user.created_at.toISOString().split('T')[0],
      lastLogin: '-'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, name, phone, role, status, password } = req.body;
    
    // If password is provided, hash it
    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }
    
    if (!isDatabaseConnected) {
      const userIndex = fallbackUsers.findIndex(u => u.id == id);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      fallbackUsers[userIndex] = {
        ...fallbackUsers[userIndex],
        username,
        email,
        name,
        phone: phone || '',
        role,
        status,
        ...(hashedPassword && { password: hashedPassword })
      };
      
      return res.json({
        id: fallbackUsers[userIndex].id,
        username: fallbackUsers[userIndex].username,
        email: fallbackUsers[userIndex].email,
        name: fallbackUsers[userIndex].name,
        phone: fallbackUsers[userIndex].phone,
        role: fallbackUsers[userIndex].role,
        status: fallbackUsers[userIndex].status,
        registeredDate: fallbackUsers[userIndex].created_at.split('T')[0],
        lastLogin: fallbackUsers[userIndex].last_login || '-'
      });
    }
    
    let query, params;
    if (hashedPassword) {
      query = 'UPDATE users SET username = $1, email = $2, name = $3, phone = $4, role = $5, status = $6, password = $7 WHERE id = $8 RETURNING id, username, email, name, phone, role, status, created_at, last_login';
      params = [username, email, name, phone || '', role, status, hashedPassword, id];
    } else {
      query = 'UPDATE users SET username = $1, email = $2, name = $3, phone = $4, role = $5, status = $6 WHERE id = $7 RETURNING id, username, email, name, phone, role, status, created_at, last_login';
      params = [username, email, name, phone || '', role, status, id];
    }
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    res.json({
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      status: user.status,
      registeredDate: user.created_at.toISOString().split('T')[0],
      lastLogin: user.last_login ? user.last_login.toISOString().split('T')[0] : '-'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isDatabaseConnected) {
      const userIndex = fallbackUsers.findIndex(u => u.id == id);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      fallbackUsers.splice(userIndex, 1);
      return res.json({ message: 'User deleted successfully' });
    }
    
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
