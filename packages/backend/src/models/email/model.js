const { createModel } = require('../model');
const { value } = require('../field');
const { value } = require('../field');

const Email = createModel([
  value('name'),
  value('domain'),
], 'email');

module.exports = {
  Email,
};
