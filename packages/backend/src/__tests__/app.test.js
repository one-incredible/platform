const request = require('supertest');
const app = require('../app');

describe('App', () => {
  it('responds to /api', done => {
    request(app)
      .get('/api')
      .expect(200)
      .expect('Hello world')
      .end(done);
  });
});
