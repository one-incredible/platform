import uuidv4 from 'uuid/v4';
import { Pool } from 'pg';
import { Video } from '../model';
import { VideoStorage } from '../storage';

describe('Video Storage', () => {
  let storage, db;

  beforeAll(() => {
    db = new Pool();
  });

  beforeEach(() => {
    storage = new VideoStorage(db);
  });

  afterAll(() => {
    return db.end();
  });

  describe('when storing', () => {
    let video;

    beforeEach(async () => {
      video = Object.assign({}, Video);
      video.id = uuidv4();
      video.name = 'My Video';
      await storage.store(video);
    });

    it('inserts row in DB with revision 1', async () => {
      const res = await db.query(
        'SELECT * FROM video_revision WHERE parent = $1',
        [video.id]
      );
      expect(res.rowCount).toEqual(1);
      const row = res.rows[0];
      expect(row.revision).toEqual(1);
      expect(row.name).toEqual('My Video');
    });

    describe('when storing same object again', () => {
      beforeEach(async () => {
        video.name = 'My Video with new name';
        await storage.store(video);
      });

      it('adds a revision', async () => {
        const res = await db.query(
          'SELECT * FROM video_revision WHERE parent = $1 ORDER BY revision ASC',
          [video.id]
        );
        expect(res.rowCount).toEqual(2);
        expect(res.rows[0].name).toEqual('My Video');
        expect(res.rows[0].revision).toEqual(1);
        expect(res.rows[1].name).toEqual('My Video with new name');
        expect(res.rows[1].revision).toEqual(2);
      });
    });
  });
});
