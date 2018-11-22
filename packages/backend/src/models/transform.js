export function int(base = 10) {
  return value => parseInt(value, base);
}

export function float() {
  return parseFloat;
}
