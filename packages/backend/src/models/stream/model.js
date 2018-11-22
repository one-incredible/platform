import { createModel, field } from '../model';

export const Stream = createModel([
  field('id'),
  field('resolution_id'),
  field('file_id'),
]);
