require('dotenv').config();
const { Pool } = require('pg');

// Create a pool of connections for better performance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

module.exports = pool;
