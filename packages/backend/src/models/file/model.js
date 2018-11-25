const { createModel } = require('../model');
const { value } = require('../field');
const { int } = require('../transform');

const File = createModel([
  value('path'),
  value('mime'),
  value('size', int(10)),
], 'file');

module.exports = {
  File,
};
