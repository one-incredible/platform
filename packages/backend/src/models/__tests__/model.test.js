import { createModel, field } from '../model';
import { float, int } from '../transform';

describe('Model modules', () => {
  describe('#createModel', () => {
    const birthdate = field(
      'birthdate',
      date => date.toISOString(),
      string => new Date(string)
    );

    const Child = createModel([field('name'), birthdate]);

    const Parent = createModel([
      field('name'),
      field('salary', float(), float()),
      field('bytes', int(10), int(10)),
      birthdate,
      field('child', Child.encode, Child.decode),
    ]);

    it('creates a Model', () => {
      expect(Parent).toBeInstanceOf(Object);
    });

    describe('created Model', () => {
      it('serializes', () => {
        const payload = Parent.encode({
          name: 'John',
          salary: '12444.22',
          bytes: 121412541.224,
          birthdate: new Date('2018-05-11'),
          undefined: 'hello',
          child: {
            name: 'Bear',
            birthdate: new Date('1992-02-01'),
          },
        });

        expect(payload).toEqual({
          birthdate: '2018-05-11T00:00:00.000Z',
          bytes: 121412541,
          child: { name: 'Bear', birthdate: '1992-02-01T00:00:00.000Z' },
          name: 'John',
          salary: 12444.22,
        });
      });

      it('deserializes', () => {
        const model = Parent.decode({
          name: 'John',
          salary: '12444.22',
          bytes: '121412541.25125',
          birthdate: '2018-05-11T00:00:00.000Z',
          undefined: 'hello',
          child: {
            name: 'Buddy',
            birthdate: '1992-02-01T00:00:00.000Z',
          },
        });

        expect(model).toEqual({
          birthdate: new Date('2018-05-11T00:00:00.000Z'),
          bytes: 121412541,
          child: {
            birthdate: new Date('1992-02-01T00:00:00.000Z'),
            name: 'Buddy',
          },
          name: 'John',
          salary: 12444.22,
        });
      });
    });
  });
});
