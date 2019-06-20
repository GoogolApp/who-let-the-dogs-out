const cheerio = require("cheerio");
const request = require("request");
const moment = require("moment");

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9";

const NUMBER_OF_DAYS_GAP = 10;

const featuredLeagues = [
  "Copa do Mundo da FIFA™",
  "Amistosos",
  "Campeonato Brasileiro",
  "Campeonato Brasileiro Série B",
  "Campeonato Brasileiro Série C",
  "Campeonato Brasileiro Série D",
  "Copa do Brasil",
  "Taça Libertadores",
  "Copa do Nordeste",
  "Copa Sul-Americana",
  "Liga dos Campeões",
  "Campeonato Paulista",
  "Campeonato Mineiro",
  "Campeonato Carioca",
  "Campeonato Gaúcho",
  "Copa do Mundo Feminina da FIFA™",
  "Copa América"
];

/**
 * Get all matches from a specific day.
 *
 * @param date - a date object representing the day.
 *
 * @returns {Promise<[Match]>} Array of matches from the day.
 * @private
 */
const _getDayMatches = date => {
  date = moment(date).format("DD-MM-YYYY");
  const baseUrl = `https://globoesporte.globo.com/placar-ge/${date}/jogos.ghtml`;

  return new Promise((resolve, reject) => {
    const config = {
      url: baseUrl,
      headers: { "User-Agent": userAgent }
    };

    request(config, (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);
        const matches = [];

        $(".card-jogo").each(function() {
          var match = {};
          var item = $(this);

          const titleItem = item.find(".header").find(".titulo");
          const homeTeamItem = item.find(".mandante");
          const awayTeamItem = item.find(".visitante");
          const scoreItem = item.find(".resultado");

          const date = titleItem
            .find(".hora-local")
            .attr("content")
            .trim();
          match.matchDate = new Date(`${date}Z`);

          match.league = titleItem.find("[itemprop = name]").text();

          match.homeTeam = homeTeamItem.find(".nome-completo").text();
          match.homeTeamLogoUrl = homeTeamItem.find(".escudo").attr("src");
          match.homeTeamScore =
            scoreItem.find(".placar-mandante").text() || null;

          match.awayTeam = awayTeamItem.find(".nome-completo").text();
          match.awayTeamLogoUrl = awayTeamItem.find(".escudo").attr("src");
          match.awayTeamScore =
            scoreItem.find(".placar-visitante").text() || null;

          matches.push(match);
        });

        resolve(matches);
      } else {
        reject(error);
      }
    });
  });
};

/**
 * Get all matches from a time interval.
 *
 * @returns {Promise<[Match]>}
 * @private
 */
const _getNextMatches = () => {
  let yesterday = new Date();
  yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
  let endDay = new Date();
  endDay = new Date(endDay.setDate(endDay.getDate() + NUMBER_OF_DAYS_GAP));

  const promises = [];

  let actualDay = yesterday;
  while (actualDay <= endDay) {
    promises.push(_getDayMatches(actualDay));

    const newDate = actualDay.setDate(actualDay.getDate() + 1);
    actualDay = new Date(newDate);
  }

  return Promise.all(promises).then(
    data => data.reduce((arr, row) => arr.concat(row)),
    []
  );
};

/**
 * Get all featured matches from a date interval.
 *
 * @returns {Promise.<[Match]>}
 */
const getMatches = async () => {
  const nextMatches = await _getNextMatches();
  return nextMatches.filter(match => featuredLeagues.includes(match.league));
};

module.exports = { getMatches };
