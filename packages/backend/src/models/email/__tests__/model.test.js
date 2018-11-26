const { Email } = require('../model');

describe('Email Model', () => {
  it('decodes', () => {
    const model = File.decode({
      name: 'any-string',
    });
    expect(model.name).toEqual('any-string');
  });
});
