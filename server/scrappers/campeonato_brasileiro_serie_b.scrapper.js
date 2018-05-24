const cheerio = require('cheerio');
const request = require('request');

const leagues = require('./leagues.constants');

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';

const BRASILEIRAO_ROUNDS = 38;
const FIRST_ROUND = 1;

//TODO: Resolve all this duplicated code from campeonato_brasileiro_serie_a.js

/**
 * Makes a request in order to obtain a html that contains the roud infos.
 * Than scraps the info and returns a Promisse with de round Matches
 *
 * @param round - round of the league
 * @returns {Promise<[Match]>}
 */
const getRoundMatches = (round) => {
  const baseUrl = `https://globoesporte.globo.com/servico/backstage/esportes_campeonato/esporte/futebol/modalidade/futebol_de_campo/categoria/profissional/campeonato/` +
    `campeonato-brasileiro-b/edicao/brasileiro-serie-b-2018/fases/fase-unica-serieb-2018/rodada/${round}/jogos.html`;

  return new Promise((resolve, reject) => {
    const config = {
      url:  baseUrl,
      headers: { 'User-Agent': userAgent }
    };

    request(config, (error, response, html) => {

      if(!error) {

        const $ = cheerio.load(html);
        const matches = [];

        $('.lista-de-jogos-item').each(function () {
          var match = {};
          var item = $(this);

          match.homeTeam = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-mandante').find('.placar-jogo-equipes-nome').text();
          match.homeTeamLogoUrl = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-mandante').find('.placar-jogo-equipes-escudo-mandante').attr('src');
          match.homeTeamScore = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-placar').find('.placar-jogo-equipes-placar-mandante').text();
          match.awayTeam = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-visitante').find('.placar-jogo-equipes-sigla').attr('title');
          match.awayTeamLogoUrl = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-visitante').find('.placar-jogo-equipes-escudo-visitante').attr('src');
          match.awayTeamScore = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-placar').find('.placar-jogo-equipes-placar-visitante').text();
          match.stadium = item.find('.placar-jogo').find('.placar-jogo-informacoes').find('.placar-jogo-informacoes-local').text();
          const date = item.find('.placar-jogo').find('meta[itemprop="startDate"]').attr('content');
          const hour = item.find('.placar-jogo').find('.placar-jogo-informacoes').text().split(' ').pop();
          match.matchDate = new Date(`${date}T${hour !== '' ? hour : '00:00'}:00Z`);
          match.league = leagues.CAMPEONATO_BRASILEIRO_SERIE_B;
          match.round = `Rodada ${round}`;
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
 * Iterate between all the Brasileirão rounds in order to obtain all the matches of the League.
 *
 * @returns {Promise<[Match]>}
 */
const getMatches = () => {
  return new Promise((resolve, reject) => {
    const rounds = Array(BRASILEIRAO_ROUNDS + 1).fill().map((e,i)=>i);
    let allMatches = [];

    let chain = Promise.resolve([]);
    rounds.forEach((round) => {
      chain = chain
        .then(() => {
          return getRoundMatches(round).then((roundMatches) => {
            allMatches = allMatches.concat(roundMatches);
          });
        });
    });
    return chain.then(() => resolve(allMatches))
                .catch((err) => reject(err));
  });
};

/**
 * Get all teams from the first round of the League.
 *
 * @returns {Promise<[team]>}
 */
const getTeams = () => {
  return new Promise((resolve, reject) => {
    getRoundMatches(FIRST_ROUND).then((matches) => {
      const teams = [];
      matches.forEach((match) => {
        const homeTeam = {
          name: match.homeTeam,
          teamLogoUrl: match.homeTeamLogoUrl
        };
        const awayTeam = {
          name: match.awayTeam,
          teamLogoUrl: match.awayTeamLogoUrl
        };

        teams.push(homeTeam, awayTeam);
      });
      resolve(teams);
    }).catch(reject);
  });
};

module.exports = {getMatches, getTeams};
