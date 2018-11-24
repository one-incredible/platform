const { createModel } = require('../model');
const { value, model } = require('../field');
const { File } = require('../file/model');
const { FileStorage } = require('../file/storage');
const { Resolution } = require('../resolution/model');
const { ResolutionStorage } = require('../resolution/storage');

const Stream = createModel([
  value('id'),
  model('resolution', Resolution, ResolutionStorage),
  model('file', File, FileStorage),
]);

module.exports = {
  Stream,
};
