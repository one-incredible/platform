const { Pool } = require('pg');
const { createApp } = require('./app');

const db = new Pool();
const app = createApp(db);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  const bound = server.address();
  process.stdout.write(`Listening on ${bound.address}:${bound.port}`);
});
