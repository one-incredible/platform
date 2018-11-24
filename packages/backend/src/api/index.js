const express = require('express');
const { createFileAPIRouter } = require('./file');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/file', createFileAPIRouter({}));

module.exports = router;
