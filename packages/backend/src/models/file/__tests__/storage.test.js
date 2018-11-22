import uuidv4 from 'uuid/v4';
import { Pool } from 'pg';
import { File } from '../model';
import { FileStorage } from '../storage';

describe('File Storage', () => {
  let storage, db, fixture;

  beforeAll(() => {
    db = new Pool();
  });

  beforeEach(() => {
    storage = new FileStorage(db);
  });

  afterAll(() => {
    return db.end();
  });

  beforeEach(async () => {
    fixture = File.decode({
      id: uuidv4(),
      path: 'path/to/file.mp4',
      mime: 'video/mp4',
      size: 125125125,
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

      it('returns video for id', async () => {
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
      const res = await db.query('SELECT * FROM file_revision WHERE id = $1', [
        fixture.id,
      ]);
      expect(res.rowCount).toEqual(1);
      const row = res.rows[0];
      expect(row.revision).toEqual(1);
      expect(row.path).toEqual('path/to/file.mp4');
    });

    describe('when storing same object again', () => {
      beforeEach(async () => {
        fixture.path = 'updates/path';
        fixture.mime = 'video/ogg';
        fixture.size = 124125;
        await storage.store(fixture);
      });

      it('adds a revision', async () => {
        const res = await db.query(
          'SELECT * FROM file_revision WHERE id = $1 ORDER BY revision ASC',
          [fixture.id]
        );
        expect(res.rowCount).toEqual(2);
        expect(res.rows[0].path).toEqual('path/to/file.mp4');
        expect(res.rows[0].mime).toEqual('video/mp4');
        expect(res.rows[0].size).toEqual(125125125);
        expect(res.rows[0].revision).toEqual(1);

        expect(res.rows[1].path).toEqual('updates/path');
        expect(res.rows[1].mime).toEqual('video/ogg');
        expect(res.rows[1].size).toEqual(124125);
        expect(res.rows[1].revision).toEqual(2);
      });
    });
  });
});
