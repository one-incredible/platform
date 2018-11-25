const { createModel } = require('../model');
const { value } = require('../field');
const { int } = require('../transform');

const Resolution = createModel([
  value('width', int(10)),
  value('height', int(10)),
]);

module.exports = {
  Resolution,
};
