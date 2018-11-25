const { createModel } = require('@oneinc/super-api/model/model');
const { value } = require('@oneinc/super-api/model/field');
const { int } = require('@oneinc/super-api/model/transform');

const File = createModel([
  value('path'),
  value('mime'),
  value('size', int(10)),
], 'file');

module.exports = {
  File,
};
