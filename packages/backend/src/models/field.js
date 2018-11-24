const Type = {
  VALUE: Symbol('value field'),
  LIST: Symbol('list field'),
  MODEL: Symbol('model field'),
};

function noop(value) {
  return value;
}

function field(name, encode = noop, decode = noop) {
  return {
    type: Type.VALUE,
    name,
    encode,
    decode,

    columnName: name,
    columnValue(model) {
      return model[name];
    },
  };
}

function listField(name, Model) {
  return {
    type: Type.LIST,
    name,
    encode: values => (values ? values.map(Model.encode) : null),
    decode: values => (values ? values.map(Model.decode) : null),
  };
}

function modelField(name, Model) {
  return {
    type: Type.MODEL,
    name,
    encode: Model.encode,
    decode: Model.decode,

    columnName: `${name}_id`,
    columnValue(model) {
      return model[name].id;
    },
  };
}

module.exports = {
  Type,
  field,
  listField,
  modelField,
};
