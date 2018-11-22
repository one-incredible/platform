import { createRevisionedStorageAdapter } from '../storage';
import { File } from './model';

export const FileStorage = createRevisionedStorageAdapter(File, 'file');
