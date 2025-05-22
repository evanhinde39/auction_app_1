const express = require('express');
const router = express.Router();

// This will accept 'pool' as a parameter, just like your 'auth.js'
module.exports = function(pool) {

  // API route to create a new pool
  router.post('/create', async (req, res) => {
    console.log("In createpool api");

    const { poolName, poolStyle, maxPot, commissionerId } = req.body;  // Destructure the fields from the request body

    if (!poolName || !maxPot || !commissionerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Commiss ID", commissionerId);

    try {
      // Insert the pool into the pools table, including the commissionerId
      const result = await pool.query(
        `INSERT INTO pools (poolname, poolstyle, maxpot, commissionerid, members)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [poolName, poolStyle, maxPot, commissionerId, []] // ← Empty array
      );

      const newPoolId = result.rows[0].id;  // Get the id of the newly created pool

      res.status(201).json({ message: 'Pool created successfully', poolId: newPoolId });
    } catch (err) {
      console.error('Error creating pool:', err);
      res.status(500).json({ message: 'Error creating pool' });
    }
  });

  return router;
};
