const { createRevisionedStorageAdapter } = require('../storage');
const { Stream } = require('./model');

class StreamStorage extends createRevisionedStorageAdapter(Stream, 'stream') {
  fetch(streamId) {
    return super.fetch(streamId, async result => {
      return {
        id: result.id,
        file: await this.composed.file.fetch(result.file_id),
        resolution: await this.composed.resolution.fetch(result.resolution_id),
      };
    });
  }
}

module.exports = {
  StreamStorage,
};
