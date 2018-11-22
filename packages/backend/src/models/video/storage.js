import { Storage } from '../storage';
import {
  createPromoteRevision,
  createRevokeRevision,
  createFetchRevision,
  createStoreRevision,
} from '../query';
import { Video } from './model';

const Query = {
  fetchRevision: createFetchRevision(Video, 'video'),
  storeRevision: createStoreRevision(Video, 'video'),
  revokeRevision: createRevokeRevision('video'),
  promoteRevision: createPromoteRevision('video'),
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
      await this.db.query(Query.revokeRevision(video));

      const result = await this.db.query(Query.storeRevision(video));

      const { revision } = result.rows[0];

      await this.db.query(Query.promoteRevision(video, revision));

      await this.db.query('COMMIT');
    } catch (e) {
      await this.db.query('ROLLBACK');
      throw e;
    }
  }
}
