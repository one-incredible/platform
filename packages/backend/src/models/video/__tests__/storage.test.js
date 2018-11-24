const uuidv4 = require('uuid/v4');
const { Pool } = require('pg');
const { Video } = require('../model');
const { VideoStorage } = require('../storage');

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

  describe('#fetch', () => {
    describe('when id badly formatted', () => {
      it('throws error', () => {
        expect(storage.fetch('bla-he')).rejects.toThrow();
      });
    });

    describe('when not existing', () => {
      it('returns null', async () => {
        const video = await storage.fetch(
          '2ebcd514-ee34-11e8-80c0-00090ffe0001'
        );
        expect(video).toBe(null);
      });
    });

    describe('when video stored', () => {
      let fixtureVideo;

      beforeEach(async () => {
        fixtureVideo = Video.decode({
          id: uuidv4(),
          name: 'My Video',
        });
        await storage.store(fixtureVideo);
      });

      it('returns video for id', async () => {
        const returnedVideo = await storage.fetch(fixtureVideo.id);
        expect(returnedVideo).toEqual(fixtureVideo);
      });
    });
  });

  describe('#store', () => {
    let video;

    beforeEach(async () => {
      video = Video.decode({
        id: uuidv4(),
        name: 'My Video',
      });
      await storage.store(video);
    });

    it('inserts row in DB with revision 1', async () => {
      const res = await db.query('SELECT * FROM video_revision WHERE id = $1', [
        video.id,
      ]);
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
          'SELECT * FROM video_revision WHERE id = $1 ORDER BY revision ASC',
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
