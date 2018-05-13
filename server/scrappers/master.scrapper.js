const campeonatoBasileiroSerieA = require('./campeonato_brasileiro_serie_a.scrapper');

/**
 * List of all leagues scrappers.
 * Each supported League has his own scrapper.
 */
const scrappers = [
  campeonatoBasileiroSerieA
];

/**
 * Returns a Promise with an array of arrays of matches.
 */
const getAllMatches = () => {
  const promises = [];
  scrappers.forEach((scrapper) => {
    promises.push(scrapper.getMatches());
  });
  return Promise.all(promises);
};

module.exports = {getAllMatches};
