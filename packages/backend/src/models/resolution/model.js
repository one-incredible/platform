const { createModel } = require('@oneinc/super-api/model/model');
const { value } = require('@oneinc/super-api/model/field');
const { int } = require('@oneinc/super-api/model/transform');

const Resolution = createModel([
  value('width', int(10)),
  value('height', int(10)),
], 'resolution');

module.exports = {
  Resolution,
};
