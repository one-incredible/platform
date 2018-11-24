const { createRevisionedStorageAdapter } = require('../storage');
const { Image } = require('./model');

const ImageStorage = createRevisionedStorageAdapter(Image, 'image');

module.exports = {
  ImageStorage,
};
