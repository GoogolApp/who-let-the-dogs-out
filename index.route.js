const express = require('express');
const matchRoutes = require('./server/match/match.route');

const router = express.Router(); // eslint-disable-line new-cap

// mount matches routes at /matches
router.use('/matches', matchRoutes);

module.exports = router;
