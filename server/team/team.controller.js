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


const updateTeamsCollection = (req, res, next) => {
  Team.dropModel().then(() => {
    scrapper.getAllTeams().then((arrayOfArraysOfTeams) => {
      const promises = [];
      arrayOfArraysOfTeams.forEach((teams) => {
        teams.forEach((team) => {
          promises.push(_saveTeam(team));
        });
      });
      Promise.all(promises)
        .then(() => res.json({}))
        .catch(e => next(e));
    });
  });
};

const list = (req, res, next) => {
  Team.list()
    .then((teams) => res.json(teams))
    .catch(e => next(e));
};

module.exports = {updateTeamsCollection, list};
