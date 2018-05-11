const Match = require('./match.model');


/**
 * Get match list.
 * @property {number} req.query.skip - Number of matches to be skipped.
 * @property {number} req.query.limit - Limit number of matches to be returned.
 * @returns {Match[]}
 */
function list(req, res, next) {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  Match.list(startDate, endDate)
    .then(users => res.json(users))
    .catch(e => next(e));
}


/**
 * Create a hardcoded match only for tests.
 */
function create(req, res, next) {

  const matchHardcoded = {
    homeTeam: "homeTeam",
    awayTeam: "awayTeam",
    homeTeamLogoUrl: "homeTeamUrl",
    awayTeamLogoUrl: "awayTeamUrl",
    stadium: "Stadium",
    league: "League",
    matchDate: Date.now()
  };

  const match = new Match(matchHardcoded);

  match.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

module.exports = {list, create};
