const schedule = require('node-schedule');
const request = require('request');

const data = {
  method: 'POST',
  uri: 'http://localhost:3001/api/matches',
  multipart: [{
    'content-type': 'application/json',
    body: JSON.stringify({token: '0ac05cee8c97ae2758e3a07809026969ee068bce'})
  }]
}

const cb = (error, response, body) => {
  if(response.statusCode == 201){
    console.log("Matches are successfully updated");
  } else {
    console.log("Shit! I don`t know what happen, but something is wrong.");
  }
};

const scheduleDBUpdate = () => {
  console.log('scheduler created!!');
  const rule = new schedule.RecurrenceRule();
  rule.minute = 0;

  const j = schedule.scheduleJob(rule, () => {
    request(data, cb);
  });
};

module.exports = {scheduleDBUpdate};
