import { createModel, field } from '../model';
import { createFetchRevision } from '../query';

describe('Query modules', () => {
  describe('#createFetchRevision', () => {
    const Model = createModel([field('name'), field('length'), field('rate')]);

    it('creates a query builder based on model', () => {
      const createQuery = createFetchRevision(Model, 'video');
      const query = createQuery('my-whatever-id');
      expect(query.text).toEqual(
        'SELECT r.parent AS id, r.name, r.length, r.rate FROM video_revision r JOIN video p ON v.id = r.parent AND v.revision = r.revision WHERE p.id = $1'
      );
      expect(query.values).toEqual(['my-whatever-id']);
    });
  });
});
