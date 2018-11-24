function noop(value) {
  return value;
}

function field(name, encode = noop, decode = noop) {
  return {
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
    name,
    encode: values => values.map(Model.encode),
    decode: values => values.map(Model.decode),
  };
}

function modelField(name, Model) {
  return {
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
  field,
  listField,
  modelField,
};
