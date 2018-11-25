const { isUUID } = require('../validation');

describe('Validation', () => {
  describe('#isUUID', () => {
    [
      ['d730c1a0-effc-11e8-a721-00090ffe0001', true],
      ['d730c1a0-effc-11e8-a721-00090ffe000', false],
      ['g730c1a0-effc-11e8-a721-00090ffe0001', false],
      ['d730c1a0a-effc-11e8-a721-00090ffe0001', false],
      ['d730c1a0-effca-11e8-a721-00090ffe0001', false],
      ['d730c1a0-effc-11e8a-a721-00090ffe0001', false],
      ['d730c1a0-effc-11e8-a721a-00090ffe0001', false],
      ['124125125', false],
    ].forEach(([candidate, result]) => {
      it(`${candidate} validates to ${result}`, () => {
        expect(isUUID(candidate)).toBe(result);
      });
    });
  });
});
