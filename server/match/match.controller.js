const Match = require('./match.model');

const scrapper = require('../scrappers/master.scrapper');


/**
 * Get match list.
 * @property {number} req.query.skip - Number of matches to be skipped.
 * @property {number} req.query.limit - Limit number of matches to be returned.
 * @returns {Match[]}
 */
const list = (req, res, next) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  Match.list(startDate, endDate)
    .then(matches => res.json(matches))
    .catch(e => next(e));
};

/**
 * Save the passed match in the database.
 * @param newMatch
 * @returns {Promise}
 */
const _saveMatch = newMatch => {
  const match = new Match(newMatch);
  return match.save();
};

/**
 * Scrap and update our collection of Matches.
 */
const updateMatchesCollection = (req, res, next) => {
  Match.dropModel().then(() => {
    scrapper.getAllMatches().then((arrayOfArraysOfMatches) => {
      const promises = [];
      arrayOfArraysOfMatches.forEach((arrayOfMatches) => {
        arrayOfMatches.forEach((match) => {
          promises.push(_saveMatch(match));
        });
      });
      Promise.all(promises)
        .then(() => res.json({}))
        .catch(e => next(e));
    });
  });
};

module.exports = {list, updateMatchesCollection};
