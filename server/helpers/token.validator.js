const config = require('../../config/config');

const httpStatus = require('http-status');
const APIError = require('./APIError');


const validateToken = (req, res, next) => {
  if (req.body.token !== config.updateMatchesToken) {
    next(new APIError('Invalid token', httpStatus.UNAUTHORIZED, true));
  } else {
    next();
  }
};

module.exports = {
  validateToken
};
