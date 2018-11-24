const { Video } = require('../model');

describe('Video Model', () => {
  describe('#decode', () => {
    it('works', () => {
      const model = Video.decode(
        JSON.parse('{"id":"any-string","name":"A name"}')
      );
      expect(model.id).toEqual('any-string');
    });
  });

  describe('#encode', () => {
    it('works', () => {
      const payload = Video.encode({
        id: 'any-string',
        name: 'A name',
      });
      expect(JSON.stringify(payload)).toEqual(
        '{"id":"any-string","name":"A name"}'
      );
    });
  });
});
