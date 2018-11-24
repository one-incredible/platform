const { createModel } = require('../model');
const { value } = require('../field');
const { int } = require('../transform');

const File = createModel([
  value('id'),
  value('path'),
  value('mime'),
  value('size', int(10), int(10)),
]);

module.exports = {
  File,
};
