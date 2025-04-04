const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');  // Use Pool instead of Client for better connection handling
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Database connection pool (keeps connections alive for queries)
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

// Test database connection route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time'); // Simple query
    res.json({ success: true, time: result.rows[0].current_time });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Express backend is running');
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
