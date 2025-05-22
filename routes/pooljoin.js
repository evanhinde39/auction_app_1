// routes/poolAction.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {

    console.log("NEW LOG");
  // PUT /api/pools/join/:id/:userId
  router.put('/join/:id/:userId', async (req, res) => {
    console.log("IN POOL JOIN BACKEND CALL");
    const { id: poolId, userId } = req.params;
    console.log(`Trying to join pool ${poolId} with user ${userId}`);

    try {
        const result = await pool.query(
            `
            UPDATE pools
            SET members = array_append(members, $1)
            WHERE id = $2 AND NOT ($1 = ANY(members))
            RETURNING *
            `,
            [String(userId), parseInt(poolId)]
        );
          

      if (result.rowCount === 0) {
        return res.status(400).json({ message: 'User already joined or pool not found' });
      }

      res.status(200).json({ message: 'You have joined the pool', pool: result.rows[0] });
    } catch (err) {
      console.error('Error joining pool:', err);
      res.status(500).json({ message: 'Error joining pool' });
    }
  });

  return router;
};
