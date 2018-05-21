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

TeamSchema.statics = {
  dropModel () {
    return this.collection.remove();
  }
};

module.exports = mongoose.model('Team', TeamSchema);
