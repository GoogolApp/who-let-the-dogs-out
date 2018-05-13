const campeonatoBasileiroSerieA = require('./campeonato_brasileiro_serie_a.scrapper');
const campeonatoBrasieiroSerieB = require('./campeonato_brasileiro_serie_b.scrapper');

/**
 * List of all leagues scrappers.
 * Each supported League has his own scrapper.
 */
const scrappers = [
  campeonatoBasileiroSerieA,
  campeonatoBrasieiroSerieB
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
