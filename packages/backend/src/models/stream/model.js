const { createModel } = require('../model');
const { value, model } = require('../field');
const { File } = require('../file/model');
const { Resolution } = require('../resolution/model');

const Stream = createModel([
  value('id'),
  model('resolution', Resolution),
  model('file', File),
]);

module.exports = {
  Stream,
};
