const UUID_RE = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

function isUUID(value) {
  return UUID_RE.test(value);
}

module.exports = {
  isUUID,
};
