const { createRevisionedStorageAdapter } = require('../storage');
const { Stream } = require('./model');

const StreamStorage = createRevisionedStorageAdapter(Stream, 'stream');

module.exports = {
  StreamStorage,
};
