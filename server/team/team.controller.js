const Team = require('./team.model');

const _saveTeam = newTeam => {
  const team = new Team(newTeam);
  return team.save();
};


