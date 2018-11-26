const { createModel, Field } = require('@oneinc/super-api/model');
const { date } = require('@oneinc/super-api/model/transform');

const Email = createModel(
  [Field.value('address'), Field.value('verfiedAt', date())],
  'email'
);

module.exports = {
  Email,
};
