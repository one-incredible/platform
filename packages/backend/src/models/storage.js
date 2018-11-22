import {
  createPromoteRevision,
  createFetchRevision,
  createStoreRevision,
} from './query';

function noop(value) {
  return value;
}

export function createRevisionedStorageAdapter(Model, tableName) {
  const Query = {
    fetchRevision: createFetchRevision(Model, tableName),
    storeRevision: createStoreRevision(Model, tableName),
    promoteRevision: createPromoteRevision(tableName),
  };

  class StorageAdapter extends Storage {
    async fetch(modelId, prepare = noop) {
      const result = await this.db.query(Query.fetchRevision(modelId));
      if (result.rowCount === 0) {
        return null;
      }

      return prepare(result.rows[0]);
    }

    async store(model) {
      try {
        await this.db.query('BEGIN');

        const result = await this.db.query(Query.storeRevision(model));

        const { revision } = result.rows[0];

        await this.db.query(Query.promoteRevision(model, revision));

        await this.db.query('COMMIT');
      } catch (error) {
        await this.db.query('ROLLBACK');
        throw error;
      }
    }
  }

  return StorageAdapter;
}

export class Storage {
  constructor(db) {
    this.db = db;
  }
}
