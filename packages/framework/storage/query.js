function createFetchRevision(Model, name) {
  const parentTable = name;
  const revisionTable = `${name}_revision`;

  const fields = Model.fields
    .filter(field => field.columnName)
    .map(field => `r.${field.columnName}`);

  const text = [
    'SELECT ' + fields.join(', '),
    `FROM ${revisionTable} r`,
    `JOIN ${parentTable} p ON p.id = r.id AND p.revision = r.revision`,
    'WHERE p.id = $1',
  ].join(' ');

  return function createQuery(id) {
    return {
      text,
      values: [id],
    };
  };
}

function createStoreRevision(Model, name) {
  const revisionTable = `${name}_revision`;

  const fields = Model.fields.filter(field => field.columnName);
  const columns = fields.map(field => field.columnName);
  const placeholders = fields.map((field, index) => '$' + (index + 1));

  const text = [
    `INSERT INTO ${revisionTable}`,
    '(' + [...columns, 'revision'].join(', ') + ')',
    'SELECT ' + [...placeholders, 'COALESCE(MAX(revision) + 1, 1)'].join(', '),
    `FROM ${revisionTable}`,
    'WHERE id = $1',
    'RETURNING revision',
  ].join(' ');

  return function createQuery(model) {
    return {
      text,
      values: fields.map(field => field.columnValue(model)),
    };
  };
}

function createPromoteRevision(name) {
  const insert = `INSERT INTO ${name} (id, revision) VALUES($1, $2)`;
  const update = `UPDATE ${name} SET revision = $2 WHERE id = $1`;

  return function createQuery(model, revisionNo) {
    return {
      text: revisionNo === 1 ? insert : update,
      values: [model.id, revisionNo],
    };
  };
}

function createRevokeRevision(name) {
  const text = `DELETE FROM ${name} WHERE id = $1`;

  return function createQuery(model) {
    return {
      text,
      values: [model.id],
    };
  };
}

module.exports = {
  createFetchRevision,
  createStoreRevision,
  createPromoteRevision,
  createRevokeRevision,
};