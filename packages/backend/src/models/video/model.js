const { createModel } = require('../model');
const { value, list } = require('../field');
const { Stream } = require('../stream/model');

const Video = createModel([value('id'), value('name'), list('stream', Stream)]);

module.exports = {
  Video,
};
