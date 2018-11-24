const uuidv4 = require('uuid/v4');
const request = require('supertest');
const { Pool } = require('pg');
const { createApp } = require('app');

function createStream() {
  return {
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
  };
}

describe('Stream API', () => {
  let app, db;

  beforeAll(() => {
    db = new Pool();
    app = createApp(db);
  });

  afterAll(() => {
    return db.end();
  });

  describe('GET /', () => {
    describe('with non-existing id', () => {
      it('responds with 404', done => {
        request(app)
          .get('/api/stream/b1354cdc-efc5-11e8-9804-00090ffe0001')
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
      let stream;

      beforeEach(done => {
        stream = createStream();

        request(app)
          .post('/api/stream/')
          .send(stream)
          .expect(201)
          .end(done);
      });

      it('responds with 200 and content', done => {
        request(app)
          .get(`/api/stream/${stream.id}`)
          .expect(200)
          .expect(JSON.stringify(stream))
          .end(done);
      });
    });
  });

  describe('POST /', () => {
    let stream;

    beforeEach(() => {
      stream = createStream();
    });

    describe('with non-existing id', () => {
      beforeEach(done => {
        request(app)
          .post('/api/stream/')
          .send(stream)
          .expect(201)
          .expect('location', `/api/stream/${stream.id}`)
          .end(done);
      });

      it('can be retrieved', done => {
        request(app)
          .get(`/api/stream/${stream.id}`)
          .expect(200)
          .expect(JSON.stringify(stream))
          .end(done);
      });

      describe('then with existing id', () => {
        beforeEach(done => {
          stream.resolution = {
            id: uuidv4(),
            width: 3840,
            height: 2160,
          };

          request(app)
            .post('/api/stream/')
            .send(stream)
            .expect(201)
            .expect('location', `/api/stream/${stream.id}`)
            .end(done);
        });

        it('has been updated', done => {
          request(app)
            .get(`/api/stream/${stream.id}`)
            .expect(200)
            .expect(JSON.stringify(stream))
            .end(done);
        });
      });
    });
  });
});
