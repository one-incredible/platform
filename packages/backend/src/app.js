const express = require('express');
const { Pool } = require('pg');
const { createAPI } = require('./api');

const db = new Pool();
const app = express();

app.use('/api', createAPI(db));

module.exports = app;
