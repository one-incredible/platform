const { createRevisionedStorageAdapter } = require('../storage');
const { StreamStorage } = require('../stream/storage');
const { Video } = require('./model');

class VideoStorage extends createRevisionedStorageAdapter(Video, 'video') {
  constructor(db) {
    super(db);

    this.streamStorage = new StreamStorage(db);
  }

  async fetch(videoId) {
    return await super.fetch(videoId, async result => {
      return Video.decode({
        id: result.id,
        name: result.name,
        streams: await this.getStreams(result.id),
      });
    });
  }

  async getStreams(videoId) {
    const result = await this.db.query(
      'SELECT stream_id FROM video_streams WHERE video_id = $1',
      [videoId]
    );
    return await Promise.all(
      result.rows.map(row => this.streamStorage.fetch(row.stream_id))
    );
  }

  addStream(videoId, streamId) {
    return this.db.query(
      'INSERT INTO video_streams (video_id, stream_id) VALUES($1, $2)',
      [videoId, streamId]
    );
  }

  removeStream(videoId, streamId) {
    return this.db.query(
      'DELETE FROM video_streams WHERE video_id = $1 AND stream_id = $2',
      [videoId, streamId]
    );
  }
}

module.exports = {
  VideoStorage,
};
