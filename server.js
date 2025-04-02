const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

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
