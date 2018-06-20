const campeonatoBasileiroSerieA = require('./campeonato_brasileiro_serie_a.scrapper');
const campeonatoBrasieiroSerieB = require('./campeonato_brasileiro_serie_b.scrapper');
const allLeaguesScrapper = require('./allLeaguesScrapper');
const Match = require('../match/match.model');

/**
 * List of all leagues scrappers.
 * Each supported League has his own scrapper.
 */
const scrappers = [
  allLeaguesScrapper
];

/**
 * Returns a Promise with an array of arrays of matches.
 */
const getAllMatches = () => {
  return allLeaguesScrapper.getMatches();
};

/**
 * Returns a Promise with an array of teams.
 */
const getAllTeams = async () => {
  const allMatches = await Match.find({});
  const allTeams = {};
  allMatches.forEach((match) => {
    allTeams[match.homeTeam] = {
      name: match.homeTeam,
      teamLogoUrl: match.homeTeamLogoUrl
    };

    allTeams[match.awayTeam] = {
      name: match.awayTeam,
      teamLogoUrl: match.awayTeamLogoUrl
    };
  });

  const allTeamsArray = [];
  for (const team in allTeams) {
    allTeamsArray.push(allTeams[team]);
  }

  return allTeamsArray;
};

module.exports = {getAllMatches, getAllTeams};
