const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teamLogoUrl: {
    type: String
  }
});

module.exports = mongoose.model('Team', TeamSchema);
