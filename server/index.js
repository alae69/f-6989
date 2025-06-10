
import express from 'express';
import cors from 'cors';
import { testConnection, initializeDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import propertiesRoutes from './routes/properties.js';
import bookingsRoutes from './routes/bookings.js';
import usersRoutes from './routes/users.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection and initialize
testConnection();
initializeDatabase();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
