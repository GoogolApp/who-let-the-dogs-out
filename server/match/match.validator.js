const Joi = require('joi');
const config = require('../../config/config');

const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const validateToken = (req, res, next) => {
  if (req.body.token !== config.updateMatchesToken) {
    next(new APIError('Invalid token', httpStatus.UNAUTHORIZED, true));
  } else {
    next();
  }
};

module.exports = {
  validateToken,
  updateMatchCollection: {
    body: {
      token: Joi.string().required()
    }
  }
};
