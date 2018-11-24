const express = require('express');
const { createFileAPIRouter } = require('./file');

function createAPI() {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.use('/file', createFileAPIRouter({}));

  return router;
}

module.exports = {
  createAPI,
};
