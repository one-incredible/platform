const express = require('express');

function createStorageRouter(Model, storage) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const model = Model.decode(req.body);
    await storage.store(model);
    res.statusCode = 201;
    res.set('location', `${req.baseUrl}/${model.id}`);
    res.end();
  });

  router.get('/:modelId', async (req, res) => {
    const result = await storage.fetch(req.params.modelId);
    if (!result) {
      res.statusCode = 404;
      return res.end();
    }
    res.send(Model.encode(result));
  });

  return router;
}

module.exports = {
  createStorageRouter,
};
