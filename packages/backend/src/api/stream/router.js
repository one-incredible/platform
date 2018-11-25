const { Stream } = require('models/stream/model');
const { StreamStorage } = require('models/stream/storage');
const { createStorageRouter } = require('@oneinc/super-api/api/router');

function createStreamAPIRouter(db) {
  const storage = new StreamStorage(db);
  return createStorageRouter(Stream, storage);
}

module.exports = {
  createStreamAPIRouter,
};
