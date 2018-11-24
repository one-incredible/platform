const { createModel } = require('../model');
const { field } = require('../field');
const { int } = require('../transform');

const Resolution = createModel([
  field('id'),
  field('width', int(10), int(10)),
  field('height', int(10), int(10)),
]);

module.exports = {
  Resolution,
};
