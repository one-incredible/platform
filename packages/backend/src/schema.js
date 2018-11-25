const { Type } = require('./models/field');
const { noop } = require('./models/field');
const { File } = require('./models/file/model');

function pad(size) {
    return function indent(string) {
        return string.padStart(string.length + size, ' ');
    }
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

function createColumn(field) {
    const parts = [
        field.name,
        decideType(field),
    ];

    return parts.join(' ');
}

function createSchema(Model) {
    const statements = [];

    const valueFields = Model.fields.filter(field => field.type === Type.VALUE);
    valueFields.shift();

    const mainTable = Model.name;
    const revisionTable = `${mainTable}_revision`;

    statements.push(
        [
            `CREATE TABLE ${revisionTable} (`,
            [
                'id uuid NOT NULL',
                'revision integer NOT NULL',
                ...valueFields.map(createColumn),
            ].map(pad(2)).join(',\n'),
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
            ].map(pad(2)).join(',\n'),
            ');',
        ].join('\n')
    );

    return statements;
}

const statements = createSchema(File);

process.stdout.write(statements.join('\n'));