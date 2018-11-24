const { createModel } = require('../model');
const { field } = require('../field');

const Video = createModel([field('id'), field('name')]);

module.exports = {
  Video,
};
