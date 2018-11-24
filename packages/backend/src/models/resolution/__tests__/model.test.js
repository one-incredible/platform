const { Resolution } = require('../model');

describe('Resolution Model', () => {
  it('decodes', () => {
    const model = Resolution.decode({
      id: 'any-string',
      width: 1920,
      height: 1080,
    });
    expect(model).toEqual({ id: 'any-string', width: 1920, height: 1080 });
  });

  it('encodes', () => {
    const payload = Resolution.encode({
      id: 'any-string',
      width: '1920',
      height: '1080',
    });
    expect(payload).toEqual({ height: 1080, id: 'any-string', width: 1920 });
  });
});
