const { createRevisionedStorageAdapter } = require('@oneinc/super-api/storage');
const { Image } = require('./model');

const ImageStorage = createRevisionedStorageAdapter(Image, 'image');

module.exports = {
  ImageStorage,
};
