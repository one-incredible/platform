const { createModel } = require('@oneinc/super-api/model/model');
const { model } = require('@oneinc/super-api/model/field');
const { File } = require('../file/model');
const { FileStorage } = require('../file/storage');
const { Resolution } = require('../resolution/model');
const { ResolutionStorage } = require('../resolution/storage');

const Stream = createModel([
  model('resolution', Resolution, ResolutionStorage),
  model('file', File, FileStorage),
], 'stream');

module.exports = {
  Stream,
};
