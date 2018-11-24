const uuidv4 = require('uuid/v4');
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

    describe('/file', () => {
      describe('GET /', () => {
        it('responds with Hello file', done => {
          request(app)
            .get('/api/file/')
            .expect(200)
            .expect('Hello file null')
            .end(done);
        });
      });

      describe('POST /', () => {
        it('responds', done => {
          const file = {
            id: uuidv4(),
            path: 'my/file/here.mp4',
            mime: 'video/mp4',
            size: 21152125,
          };

          request(app)
            .post('/api/file/')
            .send(file)
            .expect(201)
            .expect('location', `/api/file/${file.id}`)
            .end(done);
        });
      });
    });
  });
});
