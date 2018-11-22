import { File } from '../model';

describe('File Model', () => {
  it('decodes', () => {
    const model = File.decode({
      id: 'any-string',
      path: 'path/to/file.mp4',
      mime: 'video/mp4',
      size: 251256162,
    });
    expect(model.id).toEqual('any-string');
  });

  it('encodes', () => {
    const payload = File.encode({
      id: 'any-string',
      path: 'path/to/file.mp4',
      mime: 'image/jpeg',
      size: 12512612,
    });
    expect(payload).toEqual({
      id: 'any-string',
      mime: 'image/jpeg',
      path: 'path/to/file.mp4',
      size: 12512612,
    });
  });
});
