import { createModel, field, modelField } from '../model';
import { File } from '../file/model';
import { Resolution } from '../resolution/model';

export const Stream = createModel([
  field('id'),
  modelField('resolution', Resolution),
  modelField('file', File),
]);
