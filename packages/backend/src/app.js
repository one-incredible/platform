const express = require('express');
const api = require('./api');

const app = express();

app.use('/api', api);

module.exports = app;
