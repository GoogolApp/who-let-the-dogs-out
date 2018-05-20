const schedule = require('node-schedule');
const request = require('request');
const config = require('../../config/config');

const cb = (error, response, body) => {
  if(response.statusCode === 200){
    console.log("Matches are successfully updated");
  } else {
    console.log("Shit! I don`t know what happen, but something went wrong.");
  }
};

/**
 * Schedule a request that updates our matches collection every 00:00
 */
const scheduleDBUpdate = () => {
  console.log('scheduler created!!');
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;

  schedule.scheduleJob(rule, () => {
    request.post(
      config.api_url + '/api/matches',
      {json: {token: config.updateMatchesToken}},
      cb
    );
  });
};

module.exports = {scheduleDBUpdate};
