const assert = require('assert');
const DrawStep = require('../DrawStep');

describe('initialDraw', () => {
  let game = {};
  beforeEach(() => {
    game.playerDeck = {
      'b': 24,
      'y': 17,
      'k': 12,
      'r': 6,
      'p': 8,
      'e': 8
    }
  });
  afterEach(() => {
    game = {};
  });

  it('should remove one given card', () => {
    const mockCard = ['b'];
    const expectedResult = { 'b': 23, 'y': 17, 'k': 12, 'r': 6, 'p': 8, 'e': 8 };
    DrawStep.initialDraw(game, mockCard);
    assert.deepEqual(game.playerDeck, expectedResult);
  });

  it('should remove multiples of the same card', () => {
    const mockCards = ['b', 'b'];
    const expectedResult = { 'b': 22, 'y': 17, 'k': 12, 'r': 6, 'p': 8, 'e': 8 };
    DrawStep.initialDraw(game, mockCards);
    assert.deepEqual(game.playerDeck, expectedResult);
  });

  it('should remove several given cards', () => {
    const mockCards = ['b', 'y', 'k'];
    const expectedResult = { 'b': 23, 'y': 16, 'k': 11, 'r': 6, 'p': 8, 'e': 8 };
    DrawStep.initialDraw(game, mockCards);
    assert.deepEqual(game.playerDeck, expectedResult);
  });

})
