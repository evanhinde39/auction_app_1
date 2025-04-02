const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg');  // Import the pg package
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Database connection
const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING, // Connection string from .env file
});

// Test the database connection
client.connect()
  .then(() => {
    console.log("Successfully connected to PostgreSQL database!");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err.stack);
  })
  .finally(() => {
    client.end(); // Close the database connection after testing
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
