const { createRevisionedStorageAdapter } = require('../storage');
const { File } = require('./model');

const FileStorage = createRevisionedStorageAdapter(File, 'file');

module.exports = {
  FileStorage,
};
