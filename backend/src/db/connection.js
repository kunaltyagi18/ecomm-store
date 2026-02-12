/**
 * PostgreSQL Database Connection
 * Sets up connection pool for the application
 */

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'ecomm_store'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * Execute a database query
 * @param {string} text - SQL query string
 * @param {array} params - Query parameters
 * @returns {Promise} - Query result
 */
export const query = (text, params) => {
  return pool.query(text, params);
};

/**
 * Get a single client from the pool
 * Useful for transactions
 */
export const getClient = async () => {
  return await pool.connect();
};

/**
 * Initialize database tables
 */
export const initializeDatabase = async () => {
  try {
    console.log('Initializing PostgreSQL database...');
    
    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Products table
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER DEFAULT 0,
        category VARCHAR(100),
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Orders table
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_status VARCHAR(50) DEFAULT 'Success',
        order_status VARCHAR(50) DEFAULT 'Processing',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Order items table (for products in each order)
    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert initial sample data if tables were just created
    const productsCount = await query('SELECT COUNT(*) FROM products');
    
    if (productsCount.rows[0].count === '0') {
      console.log('Adding sample products...');
      
      const sampleProducts = [
        ['Wireless Headphones', 'Premium noise-cancelling wireless headphones', 99.99, 50, 'Electronics', 'https://via.placeholder.com/300x300?text=Headphones'],
        ['USB-C Cable', 'High-speed 3m USB-C charging cable', 12.99, 200, 'Accessories', 'https://via.placeholder.com/300x300?text=USB-C+Cable'],
        ['Wireless Mouse', 'Ergonomic wireless mouse with 2.4GHz connection', 29.99, 80, 'Electronics', 'https://via.placeholder.com/300x300?text=Mouse'],
        ['Laptop Stand', 'Adjustable aluminum laptop stand', 45.99, 40, 'Accessories', 'https://via.placeholder.com/300x300?text=Laptop+Stand'],
        ['Portable Charger', '20000mAh portable power bank with fast charging', 34.99, 120, 'Electronics', 'https://via.placeholder.com/300x300?text=Power+Bank']
      ];

      for (const product of sampleProducts) {
        await query(
          'INSERT INTO products (name, description, price, stock, category, image) VALUES ($1, $2, $3, $4, $5, $6)',
          product
        );
      }
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default pool;
