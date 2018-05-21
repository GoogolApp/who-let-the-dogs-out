const express = require('express');
const matchRoutes = require('./server/match/match.route');
const teamRoutes = require('./server/team/team.route');

const router = express.Router(); // eslint-disable-line new-cap

// mount matches routes at /matches
router.use('/matches', matchRoutes);

// mount team routes at /teams
router.use('/teams', teamRoutes);

module.exports = router;
