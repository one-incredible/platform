function noop(value) {
  return value;
}

function createSerializer(fields) {
  return function encode(model) {
    const payload = {};
    for (const field of fields) {
      payload[field.name] = field.encode(model[field.name]);
    }
    return payload;
  };
}

function createDeserializer(fields) {
  return function decode(payload) {
    const model = {};
    for (const field of fields) {
      model[field.name] = field.decode(payload[field.name]);
    }
    return model;
  };
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

function createModel(fields) {
  const encode = createSerializer(fields);
  const decode = createDeserializer(fields);

  return {
    fields,
    encode,
    decode,
  };
}

module.exports = {
  field,
  modelField,
  createModel,
};
