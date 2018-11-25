const { createModel, Field } = require('@oneinc/super-api/model');
const { int } = require('@oneinc/super-api/model/transform');

const Resolution = createModel(
  [Field.value('width', int(10)), Field.value('height', int(10))],
  'resolution'
);

module.exports = {
  Resolution,
};
