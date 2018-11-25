const { value } = require('./field');

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

function createModel(fieldSpec, name) {
  const fields = [value('id'), ...fieldSpec];

  const encode = createSerializer(fields);
  const decode = createDeserializer(fields);

  return {
    name,
    fields,
    encode,
    decode,
  };
}

module.exports = {
  createModel,
};
