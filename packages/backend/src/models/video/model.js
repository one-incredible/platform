const { createModel } = require('../model');
const { value, list } = require('../field');
const { Stream } = require('../stream/model');
const { StreamStorage } = require('../stream/storage');

const Video = createModel([
  value('id'),
  value('name'),
  list('stream', Stream, StreamStorage),
]);

module.exports = {
  Video,
};
