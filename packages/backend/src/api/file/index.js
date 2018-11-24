const express = require('express');
const { FileStorage } = require('models/file/storage');

function createFileAPIRouter(db) {
  const storage = new FileStorage(db);

  const router = express.Router();

  router.get('/', async (req, res) => {
    const result = await storage.fetch('c8f39c98-efc0-11e8-9bbb-00090ffe0001');
    res.send(`Hello file ${result}`);
  });

  return router;
}

module.exports = {
  createFileAPIRouter,
};
