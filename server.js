const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

// Import auth routes and inject the pool (if needed there)
const authRoutes = require("./routes/auth");
app.use('/api/auth', authRoutes(pool)); // pass pool if your auth.js is a function

const createPoolRoutes = require('./routes/createpool'); // adjust path
app.use('/api/createPool', createPoolRoutes(pool));

const myPoolsRoutes = require('./routes/mypools'); // adjust path
app.use('/api/myPools', myPoolsRoutes(pool));

const editPoolRoutes = require('./routes/editpool'); // adjust path
app.use('/api/editpool', editPoolRoutes(pool));


// Test DB route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    res.json({ success: true, time: result.rows[0].current_time });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Serve frontend in production
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
