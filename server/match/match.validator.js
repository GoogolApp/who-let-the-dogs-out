const Joi = require('joi');

module.exports = {
  updateMatchCollection: {
    body: {
      token: Joi.string().required()
    }
  }
};
