import { createModel, field } from '../model';
import { int } from '../transform';

export const Resolution = createModel([
  field('id'),
  field('width', int(10), int(10)),
  field('height', int(10), int(10)),
]);
