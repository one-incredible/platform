const request = require('supertest');
const { Pool } = require('pg');
const { createApp } = require('../app');

describe('App', () => {
  let app, db;

  beforeAll(() => {
    db = new Pool();
    app = createApp(db);
  });

  afterAll(() => {
    return db.end();
  });

  describe('/api', () => {
    describe('GET /', () => {
      it('responds with Hello world', done => {
        request(app)
          .get('/api')
          .expect(200)
          .expect('Hello world')
          .end(done);
      });
    });
  });
});
