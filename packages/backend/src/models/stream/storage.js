import { createRevisionedStorageAdapter } from '../storage';
import { ResolutionStorage } from '../resolution/storage';
import { FileStorage } from '../file/storage';
import { Stream } from './model';

export class StreamStorage extends createRevisionedStorageAdapter(
  Stream,
  'stream'
) {
  constructor(db) {
    super(db);

    this.fileStorage = new FileStorage(db);
    this.resolutionStorage = new ResolutionStorage(db);
  }

  async store(stream) {
    await Promise.all([
      this.fileStorage.store(stream.file),
      this.resolutionStorage.store(stream.resolution),
    ]);
    await super.store(stream);
  }
}
