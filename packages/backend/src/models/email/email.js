const { createRevisionedStorageAdapter } = require('../storage');
const { Email } = require('./model');

const FileStorage = createRevisionedStorageAdapter(Email, 'email');

module.exports = {
  FileStorage,
};
