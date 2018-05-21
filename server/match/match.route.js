const express = require('express');
const matchCtrl = require('./match.controller');

const validate = require('express-validation');
const matchValidator = require('./match.validator');
const tokenValidator = require('../helpers/token.validator');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/matches - Get list of matches */
  .get(matchCtrl.list)

  /** POST /api/matches - Populate the matches collection*/
  .post([validate(matchValidator.updateMatchCollection), tokenValidator.validateToken], matchCtrl.updateMatchesCollection);

module.exports = router;
