import { Storage } from '../storage';
import { createFetchRevision, createStoreRevision } from '../query';
import { Video } from './model';

const Query = {
  fetchRevision: createFetchRevision(Video, 'video'),

  updateRevision(video, revisionNo) {
    return {
      text: `
INSERT INTO video
(
    id,
    revision
)
VALUES
(
    $1,
    $2
)`,
      values: [video.id, revisionNo],
    };
  },

  storeRevision: createStoreRevision(Video, 'video'),
};

export class VideoStorage extends Storage {
  async fetch(videoId) {
    const result = await this.db.query(Query.fetchRevision(videoId));
    if (result.rowCount === 0) {
      return null;
    }

    return Video.decode(result.rows[0]);
  }

  async store(video) {
    try {
      await this.db.query('BEGIN');
      await this.db.query('DELETE FROM video WHERE id = $1', [video.id]);

      const result = await this.db.query(Query.storeRevision(video));

      const { revision } = result.rows[0];

      await this.db.query(Query.updateRevision(video, revision));

      await this.db.query('COMMIT');
    } catch (e) {
      await this.db.query('ROLLBACK');
      throw e;
    }
  }
}
