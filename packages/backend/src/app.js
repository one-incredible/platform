const express = require('express');
const { createAPI } = require('./api');

function createApp(db) {
  const app = express();
  app.use('/api', createAPI(db));
  return app;
}

module.exports = {
  createApp,
};
