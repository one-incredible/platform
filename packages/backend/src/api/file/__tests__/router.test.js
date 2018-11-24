const uuidv4 = require('uuid/v4');
const request = require('supertest');
const app = require('app');

function createFile() {
  return {
    id: uuidv4(),
    path: 'my/file/here.mp4',
    mime: 'video/mp4',
    size: 21152125,
  };
}

describe('File API', () => {
  describe('GET /', () => {
    describe('with non-existing id', () => {
      it('responds with 404', done => {
        request(app)
          .get('/api/file/b1354cdc-efc5-11e8-9804-00090ffe0001')
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
      let file;

      beforeEach(done => {
        file = createFile();

        request(app)
          .post('/api/file/')
          .send(file)
          .expect(201)
          .end(done);
      });

      it('responds with 200 and content', done => {
        request(app)
          .get(`/api/file/${file.id}`)
          .expect(200)
          .expect(JSON.stringify(file))
          .end(done);
      });
    });
  });

  describe('POST /', () => {
    let file;

    beforeEach(() => {
      file = createFile();
    });

    describe('with non-existing id', () => {
      beforeEach(done => {
        request(app)
          .post('/api/file/')
          .send(file)
          .expect(201)
          .expect('location', `/api/file/${file.id}`)
          .end(done);
      });

      it('can be retrieved', done => {
        request(app)
          .get(`/api/file/${file.id}`)
          .expect(200)
          .expect(JSON.stringify(file))
          .end(done);
      });

      describe('then with existing id', () => {
        beforeEach(done => {
          file.size = 600000;

          request(app)
            .post('/api/file/')
            .send(file)
            .expect(201)
            .expect('location', `/api/file/${file.id}`)
            .end(done);
        });

        it('has been updated', done => {
          request(app)
            .get(`/api/file/${file.id}`)
            .expect(200)
            .expect(JSON.stringify(file))
            .end(done);
        });
      });
    });
  });
});
