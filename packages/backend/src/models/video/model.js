const { createModel, Field } = require('@oneinc/super-api/model');
const { Image } = require('../image/model');
const { ImageStorage } = require('../image/storage');
const { Stream } = require('../stream/model');
const { StreamStorage } = require('../stream/storage');

const Video = createModel(
  [
    Field.value('name'),
    Field.list('image', Image, ImageStorage),
    Field.list('stream', Stream, StreamStorage),
  ],
  'video'
);

module.exports = {
  Video,
};
