const { Video } = require('../model');

describe('Video Model', () => {
  describe('#decode', () => {
    it('works', () => {
      const model = Video.decode({
        id: 'any-string',
        name: 'A name',
        images: [],
        streams: [],
      });
      expect(model).toEqual({
        id: 'any-string',
        name: 'A name',
        streams: [],
        images: [],
      });
    });
  });

  describe('#encode', () => {
    it('works', () => {
      const payload = Video.encode({
        id: 'any-string',
        name: 'A name',
        images: [],
        streams: [],
      });
      expect(payload).toEqual({
        id: 'any-string',
        name: 'A name',
        images: [],
        streams: [],
      });
    });
  });
});
