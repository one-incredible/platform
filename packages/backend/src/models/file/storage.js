import { createRevisionedStorageAdapter } from '../storage';
import { File } from './model';

export class FileStorage extends createRevisionedStorageAdapter(File, 'file') {
  async fetch(fileId) {
    return await super.fetch(fileId, result => File.decode(result));
  }
}
