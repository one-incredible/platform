const { Video } = require('../model');

describe('Video Model', () => {
  describe('#decode', () => {
    it('works', () => {
      const model = Video.decode({
        id: 'any-string',
        name: 'A name',
        image: [],
        stream: [],
      });
      expect(model).toEqual({ id: 'any-string', name: 'A name', stream: [], image: [] });
    });
  });

  describe('#encode', () => {
    it('works', () => {
      const payload = Video.encode({
        id: 'any-string',
        name: 'A name',
        image: [],
        stream: [],
      });
      expect(payload).toEqual({
        id: 'any-string',
        name: 'A name',
        image: [],
        stream: [],
      });
    });
  });
});
