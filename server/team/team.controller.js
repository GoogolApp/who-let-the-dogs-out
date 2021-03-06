const Team = require('./team.model');
const scrapper = require('../scrappers/master.scrapper');

/**
 * Save the passed team in DB.
 *
 * @param newTeam Team to be saved
 * @returns Promise<Team>
 * @private
 */
const _saveTeam = newTeam => {
  const team = new Team(newTeam);
  return team.save();
};

/**
 * Get team by id.
 */
const getTeamById = (req, res, next) => {
  Team.get(req.params.teamId)
    .then(team => {
      res.json(team);
    })
    .catch(err => next(err));
};

/**
 * Update Teams collection.
 */
const updateTeamsCollection = (req, res, next) => {
  scrapper.getAllTeams().then((teams) => {
    const promises = [];
    teams.forEach((team) => {
      promises.push(_saveTeam(team));
    });
    Promise.all(promises)
      .then(() => res.json(teams))
      .catch(e => {
        e.code === 11000 ? res.json(teams) : next(e);
      });
  });
};

/**
 * List all Teams from the DB.
 */
const list = (req, res, next) => {
  Team.list()
    .then((teams) => res.json(teams))
    .catch(e => next(e));
};

module.exports = {updateTeamsCollection, list, getTeamById};
