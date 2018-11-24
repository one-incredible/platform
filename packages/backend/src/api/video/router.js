const { Video } = require('models/video/model');
const { VideoStorage } = require('models/video/storage');
const { createStorageRouter } = require('api/router');

function createVideoAPIRouter(db) {
  const storage = new VideoStorage(db);
  return createStorageRouter(Video, storage);
}

module.exports = {
  createVideoAPIRouter,
};
