
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Database connection
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Database connection status
export let isDatabaseConnected = false;

// Test database connection
export const testConnection = () => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to database:', err);
      console.log('Running in fallback mode without database');
      isDatabaseConnected = false;
    } else {
      console.log('Connected to PostgreSQL database');
      isDatabaseConnected = true;
      release();
    }
  });
};

// Initialize database tables
export const initializeDatabase = async () => {
  if (!isDatabaseConnected) {
    console.log('Skipping database initialization - no connection');
    return;
  }
  
  try {
    // Create properties table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        location VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        bedrooms INTEGER,
        bathrooms INTEGER,
        image_url TEXT,
        amenities TEXT[],
        status VARCHAR(50) DEFAULT 'approved',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        property_id INTEGER REFERENCES properties(id),
        guest_name VARCHAR(255) NOT NULL,
        guest_email VARCHAR(255) NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        guests INTEGER DEFAULT 1,
        total_price DECIMAL(10,2),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table with proper authentication fields
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        role VARCHAR(50) DEFAULT 'customer',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);

    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    isDatabaseConnected = false;
  }
};
