const uuidv4 = require('uuid/v4');
const { Pool } = require('pg');
const { Stream } = require('../../stream/model');
const { Video } = require('../model');
const { StreamStorage } = require('../../stream/storage');
const { VideoStorage } = require('../storage');

describe('Video Storage', () => {
  let storage, db, fixtureStreams;

  beforeAll(async () => {
    db = new Pool();
    const streamStorage = new StreamStorage(db);
    fixtureStreams = [1, 2, 3, 4].map(() =>
      Stream.decode({
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
      })
    );
    await Promise.all(
      fixtureStreams.map(stream => streamStorage.store(stream))
    );
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
          streams: [],
        });
        await storage.store(fixtureVideo);
      });

      it('returns video for id', async () => {
        const returnedVideo = await storage.fetch(fixtureVideo.id);
        expect(returnedVideo).toEqual(fixtureVideo);
      });

      describe('and streams attached', () => {
        beforeEach(async () => {
          await storage.addStream(fixtureVideo.id, fixtureStreams[0].id);
          await storage.addStream(fixtureVideo.id, fixtureStreams[2].id);
        });

        it('stream is avaiable on video', async () => {
          const returnedVideo = await storage.fetch(fixtureVideo.id);
          expect(returnedVideo.streams.length).toEqual(2);
          expect(returnedVideo.streams[0]).toEqual(fixtureStreams[0]);
          expect(returnedVideo.streams[1]).toEqual(fixtureStreams[2]);
        });

        describe('then stream detached', () => {
          beforeEach(async () => {
            await storage.removeStream(fixtureVideo.id, fixtureStreams[0].id);
          });

          it('stream is removed from video', async () => {
            const returnedVideo = await storage.fetch(fixtureVideo.id);
            expect(returnedVideo.streams.length).toEqual(1);
            expect(returnedVideo.streams[0]).toEqual(fixtureStreams[2]);
          });
        });
      });
    });
  });

  describe('#store', () => {
    let video;

    beforeEach(async () => {
      video = Video.decode({
        id: uuidv4(),
        name: 'My Video',
        streams: [],
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
