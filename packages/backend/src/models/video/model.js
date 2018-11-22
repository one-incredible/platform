const { createModel } = require('../model');
const { field, listField } = require('../field');
const { Stream } = require('../stream/model');

const Video = createModel([
  field('id'),
  field('name'),
  listField('streams', Stream),
]);

module.exports = {
  Video,
};
