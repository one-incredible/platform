const { Type } = require('./models/field');
const { noop } = require('./models/field');
const { File } = require('./models/file/model');
const { Stream } = require('./models/stream/model');

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

function createValueColumn(field) {
    const parts = [
        field.columnName,
        decideType(field),
    ];

    return parts.join(' ');
}

function createReferenceColumn(field) {
    const parts = [
        field.columnName,
        'uuid',
        `REFERENCES ${field.Model.name} (id)`,
    ];

    return parts.join(' ');
}

function createSchema(Model) {
    const statements = [];

    const valueFields = Model.fields.filter(field => field.type === Type.VALUE);
    valueFields.shift();

    const modelFields = Model.fields.filter(field => field.type === Type.MODEL);

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

process.stdout.write(createSchema(File).join('\n') + '\n');
process.stdout.write(createSchema(Stream).join('\n') + '\n');