const { Type } = require('./field');

function ensureNamed(Model) {
  if (!Model.name) {
    throw new Error(`Model not named`);
  }
}

function pad(size) {
  return function indent(string) {
    return string.padStart(string.length + size, ' ');
  };
}

function decideType(field) {
  if (field.decode('1992-02-01T00:00:00.000Z') instanceof Date) {
    return 'timestamptz';
  }

  if (field.decode('1.3') === 1.3) {
    return 'float';
  }

  if (field.decode('1.3') === 1) {
    return 'integer';
  }

  return 'text';
}

function createValueColumn(field) {
  const parts = [field.columnName, decideType(field)];

  return parts.join(' ');
}

function createReferenceColumn(field) {
  ensureNamed(field.Model);

  const parts = [
    field.columnName,
    'uuid',
    `REFERENCES ${field.Model.name} (id)`,
  ];

  return parts.join(' ');
}

function createSchema(Model) {
  ensureNamed(Model);

  const statements = [];

  const valueFields = Model.fields.filter(field => field.type === Type.VALUE);
  valueFields.shift(); // Bump off Id.

  const modelFields = Model.fields.filter(field => field.type === Type.MODEL);

  const listFields = Model.fields.filter(field => field.type === Type.LIST);

  const mainTable = Model.name;
  const revisionTable = `${mainTable}_revision`;

  statements.push(
    [
      `CREATE TABLE ${revisionTable} (`,
      [
        'id uuid NOT NULL',
        'revision integer NOT NULL',
        ...modelFields.map(createReferenceColumn),
        ...valueFields.map(createValueColumn),
        'UNIQUE(id, revision)',
      ]
        .map(pad(2))
        .join(',\n'),
      ');',
    ].join('\n')
  );

  statements.push(
    [
      `CREATE TABLE ${mainTable} (`,
      [
        'id uuid NOT NULL',
        'revision integer NOT NULL',
        'PRIMARY KEY (id)',
        `FOREIGN KEY (id, revision) REFERENCES ${revisionTable} (id, revision)`,
      ]
        .map(pad(2))
        .join(',\n'),
      ');',
    ].join('\n')
  );

  for (const listField of listFields) {
    ensureNamed(listField.Model);
    const relationTable = listField.name;
    const listTable = `${mainTable}_${relationTable}`;
    const parent = Model.name;
    const child = listField.Model.name;
    statements.push(
      [
        `CREATE TABLE ${listTable} (`,
        [
          `${parent}_id uuid NOT NULL REFERENCES ${parent} (id)`,
          `${child}_id uuid NOT NULL REFERENCES ${child} (id)`,
          `PRIMARY KEY (${parent}_id, ${child}_id)`,
        ]
          .map(pad(2))
          .join(',\n'),
        ');',
      ].join('\n')
    );
  }

  return statements;
}

module.exports = {
  createSchema,
};
