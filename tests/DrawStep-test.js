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
    it('should initialize drawsBySlice to be an object of empty arrays', () => {
      DrawStep.initSlices(mockGame);
      const expectedResult = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
      assert.deepEqual(mockGame.drawsBySlice, expectedResult);
    });

    it('should initialize the currentSliceIndex to 0', () => {
      DrawStep.initSlices(mockGame);
      assert.deepEqual(mockGame.sliceIndex, 0);
    });

  });

  describe('draw', () => {
    it('should remove the given cards from the playerDeck', () => {
      mockGame.sliceSizes = [10, 10, 10, 9, 9, 9, 9, 9];
      mockGame.drawsBySlice = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
      mockGame.sliceIndex = 0;
      const mockCards = ['b','b'];
      const expectedResult = { 'b': 22, 'y': 17, 'k': 12, 'r': 6, 'p': 8, 'e': 8 };
      DrawStep.draw(mockGame, mockCards);
      assert.deepEqual(mockGame.playerDeck, expectedResult);
    });

    it('should push the first card drawn to the first array of drawsBySlice', () => {
      mockGame.sliceSizes = [10, 10, 10, 9, 9, 9, 9, 9];
      mockGame.drawsBySlice = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
      mockGame.sliceIndex = 0;
      const mockCards = ['b'];
      DrawStep.draw(mockGame, mockCards);
      assert.deepEqual(mockGame.drawsBySlice[0], ['b']);
    });

    it('should push cards across slices', () => {
      mockGame.sliceSizes = [1, 2];
      mockGame.drawsBySlice = { 0: [], 1: [] };
      mockGame.sliceIndex = 0;
      const mockCards = ['b', 'p'];
      DrawStep.draw(mockGame, mockCards);
      assert.deepEqual(mockGame.drawsBySlice[1], ['p']);
    });
  });

  describe('_initSliceSizes', () => {
    it('should create an array the length of the number of epidemics', () => {
      const result = DrawStep._initSliceSizes(mockGame);
      assert.equal(result.length, mockGame.playerDeck.e);
    });

    it('should create an array whose sum is the total number of cards', () => {
      const sumHelper = (object) => {
        return Object.values(object).reduce( (accum, curValue) => accum + curValue);
      };
      const expectedResultSum = sumHelper(mockGame.playerDeck);
      const result = DrawStep._initSliceSizes(mockGame);
      const resultSum = sumHelper(result);
      assert.equal(resultSum, expectedResultSum);
    });

    it('should create piles of almost the same length', () => {
      const result = DrawStep._initSliceSizes(mockGame);
      const difference = Math.max(...result) - Math.min(...result);
      assert.equal(difference, 1);
    });
  });

  describe('_calculateEpidemicChance', () => {
    it('should return 0 if an epidemic has been drawn', () => {
      mockGame.sliceSizes = [3, 3];
      mockGame.drawsBySlice = { 0: ['e'], 1: [] };
      mockGame.sliceIndex = 0;
      const result = DrawStep._calculateEpidemicChance(mockGame);
      assert.equal(result, 0);
    });

    it('should return the proper risk if an epidemic has been drawn, but the next draw will cross an epidemic slice', () => {
      mockGame.sliceSizes = [3, 3];
      mockGame.drawsBySlice = { 0: ['e','b'], 1: [] };
      mockGame.sliceIndex = 0;
      const result = DrawStep._calculateEpidemicChance(mockGame);
      assert.equal(result, 33.33);
    });

    it('should return 100 if an epidemic has not been drawn, but there are only 2 cards left in the slice', () => {
      mockGame.sliceSizes = [3, 3];
      mockGame.drawsBySlice = { 0: ['b'], 1: [] };
      mockGame.sliceIndex = 0;
      const result = DrawStep._calculateEpidemicChance(mockGame);
      assert.equal(result, 100);
    });

    it('should return the proper risk if an epidemic has not been drawn and a new slice will not be crossed', () => {
      mockGame.sliceSizes = [10, 10];
      mockGame.drawsBySlice = { 0: ['b','p','b'], 1: [] };
      mockGame.sliceIndex = 0;
      const result = DrawStep._calculateEpidemicChance(mockGame);
      assert.equal(result, 28.57);
    });
  });

});
