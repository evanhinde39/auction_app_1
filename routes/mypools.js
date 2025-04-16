const express = require('express');
const router = express.Router();

// This will accept 'pool' as a parameter, just like your 'auth.js'
module.exports = function(pool) {

  // API route to create a new pool
  router.post('/mypools', async (req, res) => {

    console.log("TEST");

    }
  )
  return router;
};
