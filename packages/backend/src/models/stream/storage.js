const { createRevisionedStorageAdapter } = require('@oneinc/super-api/storage/storage');
const { Stream } = require('./model');

const StreamStorage = createRevisionedStorageAdapter(Stream, 'stream');

module.exports = {
  StreamStorage,
};
