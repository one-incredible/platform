const { File } = require('models/file/model');
const { FileStorage } = require('models/file/storage');
const { createStorageRouter } = require('api/router');

function createFileAPIRouter(db) {
  const storage = new FileStorage(db);
  return createStorageRouter(File, storage);
}

module.exports = {
  createFileAPIRouter,
};
