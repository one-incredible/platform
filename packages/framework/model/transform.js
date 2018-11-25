function createTransform(encode, decode) {
  return { encode, decode };
}

function noop(value) {
  return value;
}

function date() {
  return createTransform(
    date => date.toISOString(),
    string => new Date(string)
  );
}

function float() {
  return createTransform(parseFloat, parseFloat);
}

function int(base = 10) {
  const parse = value => parseInt(value, base);
  return createTransform(parse, parse);
}

module.exports = {
  date,
  float,
  int,
  noop: createTransform(noop, noop),
};
