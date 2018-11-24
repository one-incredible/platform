const { createRevisionedStorageAdapter } = require('../storage');
const { Video } = require('./model');

const VideoStorage = createRevisionedStorageAdapter(Video, 'video');

module.exports = {
  VideoStorage,
};
