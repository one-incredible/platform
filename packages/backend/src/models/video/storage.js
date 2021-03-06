const { createRevisionedStorageAdapter } = require('@oneinc/super-api/storage');
const { Video } = require('./model');

const VideoStorage = createRevisionedStorageAdapter(Video, 'video');

module.exports = {
  VideoStorage,
};
