const { createRevisionedStorageAdapter } = require('../storage');
const { Resolution } = require('./model');

class ResolutionStorage extends createRevisionedStorageAdapter(
  Resolution,
  'resolution'
) {
  async fetch(resolutionId) {
    return await super.fetch(resolutionId, result => Resolution.decode(result));
  }
}

module.exports = {
  ResolutionStorage,
};
