const { createStorageRouter } = require('@oneinc/super-api/api/router');
const { File } = require('models/file/model');
const { FileStorage } = require('models/file/storage');

function createFileAPIRouter(db) {
  const storage = new FileStorage(db);
  return createStorageRouter(File, storage);
}

module.exports = {
  createFileAPIRouter,
};
