import { Storage } from '../storage';
import {
  createPromoteRevision,
  createRevokeRevision,
  createFetchRevision,
  createStoreRevision,
} from '../query';
import { Video } from './model';

function createRevisionedStorageAdapter(Model, tableName) {
  const Query = {
    fetchRevision: createFetchRevision(Model, tableName),
    storeRevision: createStoreRevision(Model, tableName),
    revokeRevision: createRevokeRevision(tableName),
    promoteRevision: createPromoteRevision(tableName),
  };

  class StorageAdapter extends Storage {}

  StorageAdapter.prototype.fetch = async function fetch(modelId) {
    const result = await this.db.query(Query.fetchRevision(modelId));
    if (result.rowCount === 0) {
      return null;
    }

    return Model.decode(result.rows[0]);
  };

  StorageAdapter.prototype.store = async function store(model) {
    try {
      await this.db.query('BEGIN');
      await this.db.query(Query.revokeRevision(model));

      const result = await this.db.query(Query.storeRevision(model));

      const { revision } = result.rows[0];

      await this.db.query(Query.promoteRevision(model, revision));

      await this.db.query('COMMIT');
    } catch (e) {
      await this.db.query('ROLLBACK');
      throw e;
    }
  }

  return StorageAdapter;
}

export const VideoStorage = createRevisionedStorageAdapter(Video, 'video');
