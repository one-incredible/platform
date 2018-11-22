# Backend / API

## Testing

Run tests with `yarn test`.

Because the tests use the DB you have to ensure the test suite can connect. 
This is managed automatically by Docker Compose in CI. If you want to run TDD 
with minimal overhead you must set the DB env for `yarn`.

```
PGDATABASE=platform \
PGUSER=platform \
PGPASSWORD=mock123 \
yarn test --watch
```
