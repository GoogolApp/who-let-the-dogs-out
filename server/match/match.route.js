const express = require('express');
const matchCtrl = require('./match.controller');

const validate = require('express-validation');
const matchValidator = require('./match.validator');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/matches - Get list of matches */
  .get(matchCtrl.list)

  /** POST /api/matches - Create a hardcoded match only for tests.*/
  .post([validate(matchValidator.updateMatchCollection), matchValidator.validateToken], matchCtrl.updateMatchesCollection);

module.exports = router;
