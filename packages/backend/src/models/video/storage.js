import { createRevisionedStorageAdapter } from '../storage';
import { Video } from './model';

export const VideoStorage = createRevisionedStorageAdapter(Video, 'video');
