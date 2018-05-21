const Joi = require('joi');

module.exports = {
  updateTeamCollection: {
    body: {
      token: Joi.string().required()
    }
  }
};
