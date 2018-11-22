import { createModel, field } from '../model';
import { int } from '../transform';

export const File = createModel([
  field('id'),
  field('path'),
  field('mime'),
  field('size', int(10), int(10)),
]);
