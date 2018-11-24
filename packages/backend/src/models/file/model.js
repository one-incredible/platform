const { createModel, field } = require('../model');
const { int } = require('../transform');

const File = createModel([
  field('id'),
  field('path'),
  field('mime'),
  field('size', int(10), int(10)),
]);

module.exports = {
  File,
};
