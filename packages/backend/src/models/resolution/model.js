const { createModel, field } = require('../model');
const { int } = require('../transform');

const Resolution = createModel([
  field('id'),
  field('width', int(10), int(10)),
  field('height', int(10), int(10)),
]);

module.exports = {
  Resolution,
};
