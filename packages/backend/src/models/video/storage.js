const { createRevisionedStorageAdapter } = require('../storage');
const { Video } = require('./model');

class VideoStorage extends createRevisionedStorageAdapter(Video, 'video') {
  async fetch(videoId) {
    return await super.fetch(videoId, result => Video.decode(result));
  }
}

module.exports = {
  VideoStorage,
};
