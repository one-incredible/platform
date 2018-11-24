const { createModel } = require('../model');
const { field, modelField } = require('../field');
const { File } = require('../file/model');
const { Resolution } = require('../resolution/model');

const Stream = createModel([
  field('id'),
  modelField('resolution', Resolution),
  modelField('file', File),
]);

module.exports = {
  Stream,
};
