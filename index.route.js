const express = require('express');
const userRoutes = require('./server/user/user.route');
const matchRoutes = require('./server/match/match.route');

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/users', userRoutes);

// mount matches routes at /matches
router.use('/matches', matchRoutes);

module.exports = router;
