const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  const bound = server.address();
  process.stdout.write(`Listening on ${bound.address}:${bound.port}`);
});
