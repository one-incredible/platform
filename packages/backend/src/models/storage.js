const {
  createPromoteRevision,
  createFetchRevision,
  createStoreRevision,
} = require('./query');

function noop(value) {
  return value;
}

function createRelationStorageAdapter(ChildStorageAdapter, parent, child) {
  const tableName = `${parent}_${child}s`;

  const Query = {
    fetch(parentId) {
      return {
        text: `SELECT ${child}_id AS id FROM ${tableName} WHERE ${parent}_id = $1`,
        values: [parentId],
      };
    },

    add(parentId, childId) {
      return {
        text: `INSERT INTO ${tableName} (${parent}_id, ${child}_id) VALUES($1, $2)`,
        values: [parentId, childId],
      };
    },

    remove(parentId, childId) {
      return {
        text: `DELETE FROM ${tableName} WHERE ${parent}_id = $1 AND ${child}_id = $2`,
        values: [parentId, childId],
      };
    },
  };

  class RelationStorageAdapter extends Storage {
    constructor(db) {
      super(db);
      this.storage = new ChildStorageAdapter(db);
    }

    async fetch(parentId) {
      const result = await this.db.query(Query.fetch(parentId));
      return await Promise.all(
        result.rows.map(row => this.storage.fetch(row.id))
      );
    }

    add(parentId, relationId) {
      return this.db.query(Query.add(parentId, relationId));
    }

    remove(parentId, relationId) {
      return this.db.query(Query.remove(parentId, relationId));
    }
  }

  return RelationStorageAdapter;
}

function createRevisionedStorageAdapter(Model, tableName) {
  const Query = {
    fetchRevision: createFetchRevision(Model, tableName),
    storeRevision: createStoreRevision(Model, tableName),
    promoteRevision: createPromoteRevision(tableName),
  };

  class RevisionedStorageAdapter extends Storage {
    constructor(db) {
      super(db);
      this.relations = {};
    }

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

  return RevisionedStorageAdapter;
}

class Storage {
  constructor(db) {
    this.db = db;
  }
}

module.exports = {
  createRevisionedStorageAdapter,
  createRelationStorageAdapter,
  Storage,
};
