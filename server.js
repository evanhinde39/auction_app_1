const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
