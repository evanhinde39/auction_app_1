const express = require('express');
const router = express.Router();

module.exports = function(pool) {

  // API route to update an existing pool
  router.put('/edit/:id', async (req, res) => {
    console.log("In editpool API");

    const poolId = req.params.id; 
    const { poolName, poolStyle, maxPot, commissionerId } = req.body;

    if (!poolName || !maxPot || !commissionerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const result = await pool.query(
        `UPDATE pools 
         SET poolname = $1, poolstyle = $2, maxpot = $3 
         WHERE id = $4 AND commissionerid = $5
         RETURNING *`,
        [poolName, poolStyle, maxPot, poolId, commissionerId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Pool not found or unauthorized' });
      }

      res.status(200).json({ message: 'Pool updated successfully', pool: result.rows[0] });
    } catch (err) {
      console.error('Error updating pool:', err);
      res.status(500).json({ message: 'Error updating pool' });
    }
  });

  return router;
};
