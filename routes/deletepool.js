// routes/deletepool.js
const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.delete('/:id', async (req, res) => {
    const poolId = req.params.id;
    console.log("In delete pool api");
    try {
      await pool.query('DELETE FROM pools WHERE id = $1', [poolId]);
      res.status(200).json({ message: 'Pool deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete pool' });
    }
  });

  return router;
};
