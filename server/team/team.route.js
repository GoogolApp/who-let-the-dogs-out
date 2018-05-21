const express = require('express');
const teamCtrl = require('./team.controller');

const validate = require('express-validation');
const teamValidator = require('./team.validator');
const tokenValidator = require('../helpers/token.validator');

const router = express.Router(); // eslint-disable-line new-cap


router.route('/')
  /** GET /api/teams - Get list of teams */
  .get(teamCtrl.list)

  /** POST /api/teams - Populate the teams collection */
  .post([validate(teamValidator.updateTeamCollection), tokenValidator.validateToken], teamCtrl.updateTeamsCollection);

module.exports = router;
