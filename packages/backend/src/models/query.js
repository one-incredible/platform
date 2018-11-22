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
