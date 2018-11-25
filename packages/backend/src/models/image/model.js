const { createModel, Field } = require('@oneinc/super-api/model');
const { File } = require('../file/model');
const { FileStorage } = require('../file/storage');
const { Resolution } = require('../resolution/model');
const { ResolutionStorage } = require('../resolution/storage');

const Image = createModel(
  [
    Field.model('resolution', Resolution, ResolutionStorage),
    Field.model('file', File, FileStorage),
  ],
  'image'
);

module.exports = {
  Image,
};
