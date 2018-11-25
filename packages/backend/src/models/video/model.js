const { createModel } = require('@oneinc/super-api/model/model');
const { value, list } = require('@oneinc/super-api/model/field');
const { Image } = require('../image/model');
const { ImageStorage } = require('../image/storage');
const { Stream } = require('../stream/model');
const { StreamStorage } = require('../stream/storage');

const Video = createModel([
  value('name'),
  list('image', Image, ImageStorage),
  list('stream', Stream, StreamStorage),
], 'video');

module.exports = {
  Video,
};
