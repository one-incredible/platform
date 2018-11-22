import { createRevisionedStorageAdapter } from '../storage';
import { Resolution } from './model';

export class ResolutionStorage extends createRevisionedStorageAdapter(
  Resolution,
  'resolution'
) {
  async fetch(resolutionId) {
    return await super.fetch(resolutionId, result => Resolution.decode(result));
  }
}
