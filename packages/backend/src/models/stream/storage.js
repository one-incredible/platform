const { createRevisionedStorageAdapter } = require('../storage');
const { ResolutionStorage } = require('../resolution/storage');
const { FileStorage } = require('../file/storage');
const { Stream } = require('./model');

class StreamStorage extends createRevisionedStorageAdapter(Stream, 'stream') {
  constructor(db) {
    super(db);

    this.fileStorage = new FileStorage(db);
    this.resolutionStorage = new ResolutionStorage(db);
  }

  async fetch(streamId) {
    return await super.fetch(streamId, async result => {
      return {
        id: result.id,
        file: await this.fileStorage.fetch(result.file_id),
        resolution: await this.resolutionStorage.fetch(result.resolution_id),
      };
    });
  }

  async store(stream) {
    await Promise.all([
      this.fileStorage.store(stream.file),
      this.resolutionStorage.store(stream.resolution),
    ]);
    await super.store(stream);
  }
}

module.exports = {
  StreamStorage,
};
