const express = require('express');
const router = express.Router();

// This will accept 'pool' as a parameter, just like your 'auth.js'
module.exports = function(pool) {

  // createpool.js (router)
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params; // It's already a string, good!
    console.log("User ID", userId);
  
    try {
      const result = await pool.query(
        `
        SELECT id, poolname, poolstyle, maxpot, commissionerid, members
        FROM pools
        WHERE commissionerid = $1 OR $1 = ANY(members)
        `,
        [userId]
      );
      
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching user pools:', err);
      res.status(500).json({ error: 'Failed to get pools' });
    }
  });
  

  return router;
};
