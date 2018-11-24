const express = require('express');
const { FileStorage } = require('models/file/storage');

function createFileAPIRouter(db) {
  const storage = new FileStorage(db);

  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello file');
  });

  return router;
}

module.exports = {
  createFileAPIRouter,
};
