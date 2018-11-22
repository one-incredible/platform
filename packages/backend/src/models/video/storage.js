const { createRevisionedStorageAdapter } = require('../storage');
const { Video } = require('./model');

class VideoStorage extends createRevisionedStorageAdapter(Video, 'video') {
  async fetch(videoId) {
    return await super.fetch(videoId, result => {
      return Video.decode({
        id: result.id,
        name: result.name,
        streams: [],
      });
    });
  }
}

module.exports = {
  VideoStorage,
};
