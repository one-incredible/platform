const { createModel } = require('@oneinc/super-api/model/model');
const { model } = require('@oneinc/super-api/model/field');
const { File } = require('../file/model');
const { FileStorage } = require('../file/storage');
const { Resolution } = require('../resolution/model');
const { ResolutionStorage } = require('../resolution/storage');

const Image = createModel([
  model('resolution', Resolution, ResolutionStorage),
  model('file', File, FileStorage),
], 'image');

module.exports = {
  Image,
};
