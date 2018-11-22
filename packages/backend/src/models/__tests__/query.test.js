import { createModel, field } from '../model';
import {
  createFetchRevision,
  createStoreRevision,
  createRevokeRevision,
  createPromoteRevision,
} from '../query';

describe('Query modules', () => {
  const Model = createModel([
    field('id'),
    field('name'),
    field('length'),
    field('rate'),
  ]);

  describe('#createFetchRevision', () => {
    it('creates a query builder based on model', () => {
      const createQuery = createFetchRevision(Model, 'video');
      const query = createQuery('my-whatever-id');
      expect(query.text).toEqual(
        'SELECT r.id, r.name, r.length, r.rate FROM video_revision r JOIN video p ON p.id = r.id AND p.revision = r.revision WHERE p.id = $1'
      );
      expect(query.values).toEqual(['my-whatever-id']);
    });
  });

  describe('#createStoreRevision', () => {
    it('creates a query builder based on model', () => {
      const model = Model.decode({
        id: '352b2178-ee3c-11e8-9af5-00090ffe0001',
        name: 'Barry',
        length: 230.23,
        rate: 12,
      });

      const createQuery = createStoreRevision(Model, 'video');
      const query = createQuery(model);
      expect(query.text).toEqual(
        'INSERT INTO video_revision (id, name, length, rate, revision) SELECT $1, $2, $3, $4, COALESCE(MAX(revision) + 1, 1) FROM video_revision WHERE id = $1 RETURNING revision'
      );
      expect(query.values).toEqual([
        '352b2178-ee3c-11e8-9af5-00090ffe0001',
        'Barry',
        230.23,
        12,
      ]);
    });
  });

  describe('#createPromoteRevision', () => {
    it('creates a query builder based on model', () => {
      const model = Model.decode({
        id: '01837ed6-ee3e-11e8-b6f6-00090ffe0001',
        name: 'Barry',
        length: 230.23,
        rate: 12,
      });

      let query;
      const createQuery = createPromoteRevision('video');

      query = createQuery(model, 1);
      expect(query.text).toEqual(
        'INSERT INTO video (id, revision) VALUES($1, $2)'
      );
      expect(query.values).toEqual(['01837ed6-ee3e-11e8-b6f6-00090ffe0001', 1]);

      query = createQuery(model, 2);
      expect(query.text).toEqual(
        'UPDATE video SET revision = $2 WHERE id = $1'
      );
      expect(query.values).toEqual(['01837ed6-ee3e-11e8-b6f6-00090ffe0001', 2]);
    });
  });

  describe('#createRevokeRevision', () => {
    it('creates a query builder based on model', () => {
      const model = Model.decode({
        id: 'c5c2256e-ee3d-11e8-9cad-00090ffe0001',
        name: 'Barry',
        length: 230.23,
        rate: 12,
      });

      const createQuery = createRevokeRevision('video');
      const query = createQuery(model);
      expect(query.text).toEqual('DELETE FROM video WHERE id = $1');
      expect(query.values).toEqual(['c5c2256e-ee3d-11e8-9cad-00090ffe0001']);
    });
  });
});
