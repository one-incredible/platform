const express = require('express');
const { createFileAPIRouter } = require('./file/router');
const { createStreamAPIRouter } = require('./stream/router');

function createAPI(db) {
  const router = express.Router();

  router.use(express.json());

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.use('/file', createFileAPIRouter(db));
  router.use('/stream', createStreamAPIRouter(db));

  return router;
}

module.exports = {
  createAPI,
};
