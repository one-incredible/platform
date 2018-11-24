const uuidv4 = require('uuid/v4');
const request = require('supertest');
const { Pool } = require('pg');
const { createApp } = require('app');
const { StreamStorage } = require('models/stream/storage');
const { VideoStorage } = require('models/video/storage');

function createFactory(create, storage) {
  async function store() {
    const instance = create();
    await storage.store(instance);
    return instance;
  }

  create.store = store;

  return create;
}

function createVideoFactory(db) {
  return createFactory(
    () => ({
      id: uuidv4(),
      name: 'Hello',
    }),
    new VideoStorage(db)
  );
}

function createStreamFactory(db) {
  return createFactory(
    () => ({
      id: uuidv4(),
      resolution: {
        id: uuidv4(),
        width: 1920,
        height: 1080,
      },
      file: {
        id: uuidv4(),
        path: 'path/to/file',
        mime: 'video/mp4',
        size: 1241125,
      },
    }),
    new StreamStorage(db)
  );
}

describe('Stream API', () => {
  let app, db, videoFactory, streamFactory;

  beforeAll(() => {
    db = new Pool();
    app = createApp(db);
    videoFactory = createVideoFactory(db);
    streamFactory = createStreamFactory(db);
  });

  afterAll(() => {
    return db.end();
  });

  describe('GET /', () => {
    describe('with non-existing id', () => {
      it('responds with 404', done => {
        request(app)
          .get('/api/video/b1354cdc-efc5-11e8-9804-00090ffe0001')
          .expect(404)
          .expect({
            error: {
              message:
                'No object found for b1354cdc-efc5-11e8-9804-00090ffe0001',
            },
          })
          .end(done);
      });
    });

    describe('with existing id', () => {
      let video;

      beforeEach(async () => {
        video = await videoFactory.store();
      });

      it('responds with 200 and content', done => {
        request(app)
          .get(`/api/video/${video.id}`)
          .expect(200)
          .expect({
            id: video.id,
            name: 'Hello',
            stream: [],
          })
          .end(done);
      });
    });
  });

  describe('POST /', () => {
    let video;

    beforeEach(() => {
      video = videoFactory();
    });

    describe('with non-existing id', () => {
      beforeEach(done => {
        request(app)
          .post('/api/video/')
          .send(video)
          .expect(201)
          .expect('location', `/api/video/${video.id}`)
          .end(done);
      });

      it('can be retrieved', done => {
        request(app)
          .get(`/api/video/${video.id}`)
          .expect(200)
          .expect({
            id: video.id,
            name: 'Hello',
            stream: [],
          })
          .end(done);
      });

      describe('then attaching stream', () => {
        let streams;

        beforeEach(async done => {
          streams = [await streamFactory.store(), await streamFactory.store()];

          request(app)
            .put(`/api/video/${video.id}/stream/${streams[0].id}`)
            .expect(201)
            .end(done);
        });

        it('stream has been added to video', done => {
          request(app)
            .get(`/api/video/${video.id}`)
            .expect(200)
            .expect({
              id: video.id,
              name: 'Hello',
              stream: [streams[0]],
            })
            .end(done);
        });

        describe('then attaching another stream', () => {
          beforeEach(done => {
            request(app)
              .put(`/api/video/${video.id}/stream/${streams[1].id}`)
              .expect(201)
              .end(done);
          });

          it('both streams has been added to video', done => {
            request(app)
              .get(`/api/video/${video.id}`)
              .expect(200)
              .expect(response => {
                const video = response.body;
                expect(video.stream).toContainEqual(streams[0]);
                expect(video.stream).toContainEqual(streams[1]);
              })
              .end(done);
          });
        });

        describe('then deleting stream', () => {
          beforeEach(done => {
            request(app)
              .delete(`/api/video/${video.id}/stream/${streams[0].id}`)
              .expect(200)
              .end(done);
          });

          it('there is no streams on video', done => {
            request(app)
              .get(`/api/video/${video.id}`)
              .expect(200)
              .expect({
                id: video.id,
                name: 'Hello',
                stream: [],
              })
              .end(done);
          });
        });
      });

      describe('then with existing id', () => {
        beforeEach(done => {
          video.name = 'Good bye';

          request(app)
            .post('/api/video/')
            .send(video)
            .expect(201)
            .expect('location', `/api/video/${video.id}`)
            .end(done);
        });

        it('has been updated', done => {
          request(app)
            .get(`/api/video/${video.id}`)
            .expect(200)
            .expect({
              id: video.id,
              name: 'Good bye',
              stream: [],
            })
            .end(done);
        });
      });
    });
  });
});
