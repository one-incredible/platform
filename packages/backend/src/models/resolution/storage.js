const { createRevisionedStorageAdapter } = require('@oneinc/super-api/storage/storage');
const { Resolution } = require('./model');

const ResolutionStorage = createRevisionedStorageAdapter(
  Resolution,
  'resolution'
);

module.exports = {
  ResolutionStorage,
};
