const assert = require('assert');
const InfectStep = require('../InfectStep');

describe('InfectStep', () => {
  let mockGame = {};
  beforeEach(() => {
    mockGame.infectionDeck = {
      'ny': 3,
      'was': 3,
      'jac': 3
    };
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

  describe('initDiscardHistory', () => {
    it('should create an object with as many arrays as epidemic cards', () => {
      InfectStep.initDiscardHistory(mockGame);
      assert.equal(Object.keys(mockGame.discardHistory).length, mockGame.playerDeck.e);
    });

    it('should initialize the historyIndex to 0', () => {
      InfectStep.initDiscardHistory(mockGame);
      assert.equal(mockGame.historyIndex, 0);
    });
  });

  describe('initialDraw', () => {
    it('should remove one given card', () => {
      mockGame.discardHistory = { 0: [], 1: [] };
      const mockCard = ['ny'];
      const expectedResult = { 'ny': 2, 'was': 3, 'jac': 3};
      InfectStep.initialDraw(mockGame, mockCard);
      assert.deepEqual(mockGame.infectionDeck, expectedResult);
    });

    it('should remove multples of the same card', () => {
      mockGame.discardHistory = { 0: [], 1: [] };
      const mockCards = ['ny', 'ny'];
      const expectedResult = { 'ny': 1, 'was': 3, 'jac': 3};
      InfectStep.initialDraw(mockGame, mockCards);
      assert.deepEqual(mockGame.infectionDeck, expectedResult);
    });

    it('should remove several given cards', () => {
      mockGame.discardHistory = { 0: [], 1: [] };
      const mockCards = ['ny', 'was', 'jac'];
      const expectedResult = { 'ny': 2, 'was': 2, 'jac': 2};
      InfectStep.initialDraw(mockGame, mockCards);
      assert.deepEqual(mockGame.infectionDeck, expectedResult);
    });
  });

  describe('draw', () => {
    it('should remove one given card', () => {
      const mockCard = ['was'];
      InfectStep.initDiscardHistory(mockGame);
      InfectStep.draw(mockGame, mockCard);
      assert.equal(mockGame.infectionDeck['was'], 2);
    });

    it('should add a given card to the current index', () => {
      const mockCard = ['was'];
      InfectStep.initDiscardHistory(mockGame);
      InfectStep.draw(mockGame, mockCard);
      assert.deepEqual(mockGame.discardHistory[0], ['was']);
    });
  });
});
