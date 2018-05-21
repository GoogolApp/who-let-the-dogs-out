const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  teamLogoUrl: {
    type: String
  }
});

TeamSchema.statics = {
  /**
   * Drop all Team collection.
   * @returns {Promise}
   */
  dropModel () {
    return this.collection.remove();
  },

  /**
   * Get all Teams
   * @returns {Promise<[Team]>}
   */
  list() {
    return this.find().exec();
  }
};

module.exports = mongoose.model('Team', TeamSchema);
