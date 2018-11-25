#! /usr/bin/env node
const path = require('path');
const { createSchema } = require('../model/schema');

const EXPORT_NAME = process.argv[3];
const IMPORT_PATH = path.resolve(process.argv[2]);

const MODELS = require(IMPORT_PATH);

process.stdout.write(createSchema(MODELS[EXPORT_NAME]).join('\n\n') + '\n');
