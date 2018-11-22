export function createFetchRevision(Model, name) {
  const parentTable = name;
  const revisionTable = `${name}_revision`;

  const fields = Model.fields.map(field => `r.${field.name}`);

  const text = [
    'SELECT',
    fields.join(', '),
    'FROM',
    `${revisionTable} r`,
    'JOIN',
    `${parentTable} p`,
    'ON',
    'p.id = r.id AND p.revision = r.revision',
    'WHERE',
    'p.id = $1',
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

  const columns = Model.fields.map(field => field.name);
  const placeholders = Model.fields.map((field, index) => '$' + (index + 1));

  const text = [
    `INSERT INTO ${revisionTable}`,
    '(' + [...columns, 'revision'].join(', ') + ')',
    'SELECT',
    [...placeholders, 'COALESCE(MAX(revision) + 1, 1)'].join(', '),
    'FROM',
    revisionTable,
    'WHERE',
    'id = $1',
    'RETURNING revision',
  ].join(' ');

  return function createQuery(model) {
    return {
      text,
      values: Model.fields.map(field => model[field.name]),
    };
  };
}
