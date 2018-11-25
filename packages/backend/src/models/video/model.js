const { createModel, Field } = require('@oneinc/super-api/model');
const { Image } = require('../image/model');
const { ImageStorage } = require('../image/storage');
const { Stream } = require('../stream/model');
const { StreamStorage } = require('../stream/storage');

const Video = createModel(
  [
    Field.value('name'),
    Field.list('images', Image, ImageStorage),
    Field.list('streams', Stream, StreamStorage),
  ],
  'video'
);

module.exports = {
  Video,
};
