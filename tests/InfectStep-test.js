const assert = require('assert');
const InfectStep = require('../InfectStep');

describe('initialDraw', () => {
  let game = {};
  beforeEach(() => {
    game.infectionDeck = {
      'ny': 3,
      'was': 3,
      'jac': 3
    }
  });
  afterEach(() => {
    game = {};
  });

  it('should remove one given card', () => {
    const mockCard = ['ny'];
    const expectedResult = { 'ny': 2, 'was': 3, 'jac': 3};
    InfectStep.initialDraw(game, mockCard);
    assert.deepEqual(game.infectionDeck, expectedResult);
  });

  it('should remove miltples of the same card', () => {
    const mockCards = ['ny', 'ny'];
    const expectedResult = { 'ny': 1, 'was': 3, 'jac': 3};
    InfectStep.initialDraw(game, mockCards);
    assert.deepEqual(game.infectionDeck, expectedResult);
  });

  it('should remove several given cards', () => {
    const mockCards = ['ny', 'was', 'jac'];
    const expectedResult = { 'ny': 2, 'was': 2, 'jac': 2};
    InfectStep.initialDraw(game, mockCards);
    assert.deepEqual(game.infectionDeck, expectedResult);
  });
})
