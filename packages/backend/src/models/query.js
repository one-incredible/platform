export function createFetchRevision(Model, name) {
  const parentTable = name;
  const revisionTable = `${name}_revision`;

  const text = [
    'SELECT r.*',
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

export function createStoreRevision(Model, name) {
  const revisionTable = `${name}_revision`;

  const columns = Model.fields.map(field => field.columnName);
  const fields = [
    ...Model.fields.map((field, index) => '$' + (index + 1)),
    'COALESCE(MAX(revision) + 1, 1)',
  ];

  const text = [
    `INSERT INTO ${revisionTable}`,
    '(' + [...columns, 'revision'].join(', ') + ')',
    'SELECT ' + fields.join(', '),
    `FROM ${revisionTable}`,
    'WHERE id = $1',
    'RETURNING revision',
  ].join(' ');

  return function createQuery(model) {
    return {
      text,
      values: Model.fields.map(field => field.columnValue(model)),
    };
  };
}

export function createPromoteRevision(name) {
  const text = `INSERT INTO ${name} (id, revision) VALUES($1, $2)`;

  return function createQuery(model, revisionNo) {
    return {
      text,
      values: [model.id, revisionNo],
    };
  };
}

export function createRevokeRevision(name) {
  const text = `DELETE FROM ${name} WHERE id = $1`;

  return function createQuery(model) {
    return {
      text,
      values: [model.id],
    };
  };
}
