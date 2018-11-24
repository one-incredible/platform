const { createModel, field } = require('../model');

const Video = createModel([field('id'), field('name')]);

module.exports = {
  Video,
};
