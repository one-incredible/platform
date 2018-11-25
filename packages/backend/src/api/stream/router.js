const { createStorageRouter } = require('@oneinc/super-api/api/router');
const { Stream } = require('models/stream/model');
const { StreamStorage } = require('models/stream/storage');

function createStreamAPIRouter(db) {
  const storage = new StreamStorage(db);
  return createStorageRouter(Stream, storage);
}

module.exports = {
  createStreamAPIRouter,
};
