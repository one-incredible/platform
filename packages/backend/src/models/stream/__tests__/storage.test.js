import uuidv4 from 'uuid/v4';
import { Pool } from 'pg';
import { Stream } from '../model';
import { StreamStorage } from '../storage';

describe('Stream Storage', () => {
  let storage, db, fixture;

  beforeAll(() => {
    db = new Pool();
  });

  beforeEach(() => {
    storage = new StreamStorage(db);
  });

  afterAll(() => {
    return db.end();
  });

  beforeEach(async () => {
    fixture = Stream.decode({
      id: uuidv4(),
      resolution: {
        id: uuidv4(),
        width: '2048',
        height: '1024',
      },
      file: {
        id: uuidv4(),
        path: 'path/to/file',
        mime: 'video/mp4',
        size: 1241125,
      },
    });
  });

  describe('#fetch', () => {
    describe('when id badly formatted', () => {
      it('throws error', () => {
        expect(storage.fetch('bla-he')).rejects.toThrow();
      });
    });

    describe('when not existing', () => {
      it('returns null', async () => {
        const result = await storage.fetch(
          '2ebcd514-ee34-11e8-80c0-00090ffe0001'
        );
        expect(result).toBe(null);
      });
    });

    describe('when file stored', () => {
      beforeEach(async () => {
        await storage.store(fixture);
      });

      it('returns model for id', async () => {
        const returned = await storage.fetch(fixture.id);
        expect(returned).toEqual(fixture);
      });
    });
  });

  describe('#store', () => {
    beforeEach(async () => {
      await storage.store(fixture);
    });

    it('inserts row in DB with revision 1', async () => {
      const res = await db.query(
        'SELECT * FROM stream_revision WHERE id = $1',
        [fixture.id]
      );
      expect(res.rowCount).toEqual(1);
      const row = res.rows[0];
      expect(row.revision).toEqual(1);
      expect(row.resolution_id).toEqual(fixture.resolution.id);
      expect(row.file_id).toEqual(fixture.file.id);
    });

    describe('when storing same object again', () => {
      beforeEach(async () => {
        fixture.resolution = {
          id: uuidv4(),
          width: 1024,
          height: 768,
        };
        await storage.store(fixture);
      });

      it('adds a revision', async () => {
        const res = await db.query(
          'SELECT * FROM stream_revision WHERE id = $1 ORDER BY revision ASC',
          [fixture.id]
        );
        expect(res.rowCount).toEqual(2);
        expect(res.rows[0].file_id).toEqual(fixture.file.id);
        expect(res.rows[0].revision).toEqual(1);

        expect(res.rows[1].file_id).toEqual(fixture.file.id);
        expect(res.rows[1].resolution_id).toEqual(fixture.resolution.id);
        expect(res.rows[1].revision).toEqual(2);
      });
    });
  });
});
