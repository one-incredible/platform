const { createModel, Field } = require('@oneinc/super-api/model');
const { int } = require('@oneinc/super-api/model/transform');

const File = createModel(
  [Field.value('path'), Field.value('mime'), Field.value('size', int(10))],
  'file'
);

module.exports = {
  File,
};
