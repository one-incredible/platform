import { createRevisionedStorageAdapter } from '../storage';
import { Video } from './model';

export class VideoStorage extends createRevisionedStorageAdapter(
  Video,
  'video'
) {
  async fetch(videoId) {
    return await super.fetch(videoId, result => Video.decode(result));
  }
}
