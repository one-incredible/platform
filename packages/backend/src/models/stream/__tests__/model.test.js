import { Stream } from '../model';

describe('Stream Model', () => {
  it('decodes', () => {
    const model = Stream.decode({
      id: 'any-string',
      resolution: {
        id: 'b',
        width: '2048',
        height: '1024',
      },
      file: {
        id: 'a',
        path: 'path/to/file',
        mime: 'video/mp4',
        size: 1241125,
      },
    });
    expect(model).toEqual({
      file: { id: 'a', mime: 'video/mp4', path: 'path/to/file', size: 1241125 },
      id: 'any-string',
      resolution: { height: 1024, id: 'b', width: 2048 },
    });
  });

  it('encodes', () => {
    const payload = Stream.encode({
      id: 'any-string',
      resolution: {
        id: 'b',
        width: '2048',
        height: '1024',
      },
      file: {
        id: 'a',
        path: 'path/to/file',
        mime: 'video/mp4',
        size: 1241125,
      },
    });
    expect(payload).toEqual({
      file: { id: 'a', mime: 'video/mp4', path: 'path/to/file', size: 1241125 },
      id: 'any-string',
      resolution: { height: 1024, id: 'b', width: 2048 },
    });
  });
});
