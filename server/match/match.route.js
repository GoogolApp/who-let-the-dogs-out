const express = require('express');
const matchCtrl = require('./match.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/matches - Get list of users */
  .get(matchCtrl.list)

  /** POST /api/matches - Create a hardcoded match only for tests.*/
  .post(matchCtrl.create);

module.exports = router;
