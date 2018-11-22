import { Stream } from '../model';

describe('Stream Model', () => {
  it('decodes', () => {
    const model = Stream.decode({
      id: 'any-string',
      resolution_id: 'any-other-id',
      file_id: 'yet-another-id',
    });
    expect(model).toEqual({
      file_id: 'yet-another-id',
      id: 'any-string',
      resolution_id: 'any-other-id',
    });
  });

  it('encodes', () => {
    const payload = Stream.encode({
      id: 'any-string',
      resolution_id: 'any-other-id',
      file_id: 'yet-another-id',
    });
    expect(payload).toEqual({
      id: 'any-string',
      resolution_id: 'any-other-id',
      file_id: 'yet-another-id',
    });
  });
});
