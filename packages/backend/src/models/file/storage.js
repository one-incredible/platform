const { createRevisionedStorageAdapter } = require('../storage');
const { File } = require('./model');

class FileStorage extends createRevisionedStorageAdapter(File, 'file') {
  async fetch(fileId) {
    return await super.fetch(fileId, result => File.decode(result));
  }
}

module.exports = {
  FileStorage,
};
