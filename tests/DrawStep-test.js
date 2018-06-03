const assert = require('assert');
const DrawStep = require('../DrawStep');

describe('DrawStep', () => {
  let mockGame = {};
  beforeEach(() => {
    mockGame.playerDeck = {
      'b': 24,
      'y': 17,
      'k': 12,
      'r': 6,
      'p': 8,
      'e': 8
    };
    mockGame.epidemicSlices = [];
  });
  afterEach(() => {
    mockGame = {};
  });

  describe('initialDraw', () => {
    it('should remove one given card', () => {
      const mockCard = ['b'];
      const expectedResult = { 'b': 23, 'y': 17, 'k': 12, 'r': 6, 'p': 8, 'e': 8 };
      DrawStep.initialDraw(mockGame, mockCard);
      assert.deepEqual(mockGame.playerDeck, expectedResult);
    });

    it('should remove multiples of the same card', () => {
      const mockCards = ['b', 'b'];
      const expectedResult = { 'b': 22, 'y': 17, 'k': 12, 'r': 6, 'p': 8, 'e': 8 };
      DrawStep.initialDraw(mockGame, mockCards);
      assert.deepEqual(mockGame.playerDeck, expectedResult);
    });

    it('should remove several given cards', () => {
      const mockCards = ['b', 'y', 'k'];
      const expectedResult = { 'b': 23, 'y': 16, 'k': 11, 'r': 6, 'p': 8, 'e': 8 };
      DrawStep.initialDraw(mockGame, mockCards);
      assert.deepEqual(mockGame.playerDeck, expectedResult);
    });
  });

  describe('initSlices', () => {
    it('should create an array the length of the number of epidemics', () => {
      DrawStep.initSlices(mockGame);
      assert.equal(mockGame.epidemicSlices.length, mockGame.playerDeck.e);
    });

    it('should create an array whose sum is the total number of cards', () => {
      const sumHelper = (object) => {
        return Object.values(object).reduce( (accum, curValue) => accum + curValue);
      };
      const expectedResult = sumHelper(mockGame.playerDeck);
      DrawStep.initSlices(mockGame);
      const actualResult = sumHelper(mockGame.epidemicSlices);
      assert.equal(actualResult, expectedResult);
    });

    it('should create piles of almost the same length', () => {
      DrawStep.initSlices(mockGame);
      assert.equal(mockGame.epidemicSlices.length, 8);
    });
  });

  describe('draw', () => {
    it('should remove the given cards from the playerDeck', () => {
      const mockCards = ['b','b'];
      const expectedResult = { 'b': 22, 'y': 17, 'k': 12, 'r': 6, 'p': 8, 'e': 8 };
      DrawStep.draw(mockGame, mockCards);
      assert.deepEqual(mockGame.playerDeck, expectedResult);
    });

    it('should remove cards across epidemic slices', () => {
      // TODO
    });
  });


});
