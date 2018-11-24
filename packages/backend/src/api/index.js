const express = require('express');
const { createFileAPIRouter } = require('./file');

function createAPI(db) {
  const router = express.Router();

  router.use(express.json());

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.use('/file', createFileAPIRouter(db));

  return router;
}

module.exports = {
  createAPI,
};
