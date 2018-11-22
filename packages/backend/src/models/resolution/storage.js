import { createRevisionedStorageAdapter } from '../storage';
import { Resolution } from './model';

export const ResolutionStorage = createRevisionedStorageAdapter(
  Resolution,
  'resolution'
);
