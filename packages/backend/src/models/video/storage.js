const {
  createRevisionedStorageAdapter,
  createRelationStorageAdapter,
} = require('../storage');
const { StreamStorage } = require('../stream/storage');
const { Video } = require('./model');

const StreamRelationStorage = createRelationStorageAdapter(
  StreamStorage,
  'video',
  'stream'
);

class VideoStorage extends createRevisionedStorageAdapter(Video, 'video') {
  constructor(db) {
    super(db);

    this.relations.stream = new StreamRelationStorage(db);
  }

  async fetch(videoId) {
    return await super.fetch(videoId, async result => {
      return Video.decode({
        id: result.id,
        name: result.name,
        streams: await this.relations.stream.fetch(result.id),
      });
    });
  }
}

module.exports = {
  VideoStorage,
};
