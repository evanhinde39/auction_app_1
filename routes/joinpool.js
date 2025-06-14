const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  // GET /api/searchpools?name=SomeName
  router.get('/', async (req, res) => {
    const searchTerm = req.query.name || '';

    try {
      const result = await pool.query(
        `SELECT id, poolname, poolstyle, maxpot, commissionerid, members
         FROM pools
         WHERE poolname ILIKE $1`,
        [`%${searchTerm}%`]
      );

      res.json(result.rows);
    } catch (err) {
      console.error('Error searching pools by name:', err);
      res.status(500).json({ error: 'Failed to search pools' });
    }
  });
  

  return router;
};
