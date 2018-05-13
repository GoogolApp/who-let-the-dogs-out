const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const MatchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  homeTeamLogoUrl: {
    type: String,
    required: true
  },
  awayTeamLogoUrl: {
    type: String,
    required: true
  },
  homeTeamScore: {
    type: Number
  },
  awayTeamScore: {
    type: Number
  },
  stadium: {
    type: String
  },
  league: {
    type: String,
    required: true
  },
  matchDate: {
    type: Date,
    default: Date.now
  }
});


/**
 * Statics
 */
MatchSchema.statics = {
  /**
   * List matches in descending order of 'matchDate' timestamp.
   * @param {number} beginDate - Beginning of the date interval.
   * @param {number} endDate - Ending of the date interval.
   * @returns {Promise<Match[]>}
   */
  list(startDate, endDate) {
    let start = new Date();
    start.setHours(0,0,0,0);

    let end = new Date();
    end.setHours(23,59,59,999);

    // https://stackoverflow.com/questions/29327222/mongodb-find-created-results-by-date-today

    return this.find({matchDate: {$gte: startDate || start, $lte:endDate || end}})
      .sort({ matchDate: -1 })
      .exec();
  }
};

/**
 * @typedef Match
 */
module.exports = mongoose.model('Match', MatchSchema);
