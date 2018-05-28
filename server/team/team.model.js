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
   * Get team
   * @param {ObjectId} id - The objectId of the team.
   * @returns {Promise<Team>}
   */
  get(id) {
    return this.findById(id).exec();
  },

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
