import uuidv4 from 'uuid/v4';
import { Pool } from 'pg';
import { Resolution } from '../model';
import { ResolutionStorage } from '../storage';

describe('Resolution Storage', () => {
  let storage, db, fixture;

  beforeAll(() => {
    db = new Pool();
  });

  beforeEach(() => {
    storage = new ResolutionStorage(db);
  });

  afterAll(() => {
    return db.end();
  });

  beforeEach(async () => {
    fixture = Resolution.decode({
      id: uuidv4(),
      width: 3840,
      height: 2160,
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

      it('returns resolution for id', async () => {
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
        'SELECT * FROM resolution_revision WHERE id = $1',
        [fixture.id]
      );
      expect(res.rowCount).toEqual(1);
      const row = res.rows[0];
      expect(row.revision).toEqual(1);
      expect(row.width).toEqual(3840);
      expect(row.height).toEqual(2160);
    });

    describe('when storing same object again', () => {
      beforeEach(async () => {
        fixture.width = 1920;
        fixture.height = 1080;
        await storage.store(fixture);
      });

      it('adds a revision', async () => {
        const res = await db.query(
          'SELECT * FROM resolution_revision WHERE id = $1 ORDER BY revision ASC',
          [fixture.id]
        );
        expect(res.rowCount).toEqual(2);
        expect(res.rows[0].width).toEqual(3840);
        expect(res.rows[0].height).toEqual(2160);
        expect(res.rows[0].revision).toEqual(1);

        expect(res.rows[1].width).toEqual(1920);
        expect(res.rows[1].height).toEqual(1080);
        expect(res.rows[1].revision).toEqual(2);
      });
    });
  });
});
