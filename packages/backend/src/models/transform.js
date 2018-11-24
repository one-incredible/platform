function int(base = 10) {
  return value => parseInt(value, base);
}

function float() {
  return parseFloat;
}

module.exports = {
  int,
  float,
};
