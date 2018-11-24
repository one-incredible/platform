const request = require('supertest');
const app = require('../app');

describe('App', () => {
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
