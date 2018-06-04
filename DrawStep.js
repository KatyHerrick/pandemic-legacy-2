const math = require('mathjs');

module.exports = {
  // Expects array like ['b', 'b', 'r', 'p']
  initialDraw: function (game, initialCards) {
    for (let card of initialCards) {
      game.playerDeck[card]--;
    }
  },

  initSlices: function(game) {
    const sliceSizes = this._initSliceSizes(game);
    const drawsBySlice = {};
    for (let i = 0; i < sliceSizes.length; i++) {
      drawsBySlice[i] = [];
    }
    game.sliceSizes = sliceSizes;
    game.drawsBySlice = drawsBySlice;
    game.sliceIndex = 0;
  },

  // Expects array like ['b', 'b']
  draw: function(game, cards) {
    for (let card of cards) {
      let sliceIndex = game.sliceIndex;
      let thisSlice = game.drawsBySlice[sliceIndex];
      game.playerDeck[card]--;
      thisSlice.push(card);
      if (thisSlice.length === game.sliceSizes[sliceIndex]) {
        game.sliceIndex++;
      }
    }
  },

  showStatus: function(game) {
    console.log('== Player Deck ==');
    console.log(`Epidemic Chance next turn: ${epidemicChance}%`);
    const drawsInSlice = game.drawsBySlice[game.sliceIndex];
    if (game.sliceIndex >= 1) {
      console.log(`Previous Slice: ${game.drawsBySlice[game.sliceIndex-1]}`);
    };
    console.log(`Current Slice: ${drawsInSlice}`);
    const totalCardsLeft = Object.values(game.playerDeck).reduce( (accum, curValue) => accum + curValue);
    for (let [card, numLeft] of Object.entries(game.playerDeck)) {
      let percentageOfDeck = Math.round(numLeft / totalCardsLeft * 100);
      console.log(`${card}: ${numLeft}/${totalCardsLeft} (${percentageOfDeck}%)`);
    }
    const epidemicChance = this._calculateEpidemicChance(game);
  },

  _calculateEpidemicChance: function(game) {
    const sliceIndex = game.sliceIndex;
    const drawsInSlice = game.drawsBySlice[sliceIndex];
    const numCardsLeftInSlice = game.sliceSizes[sliceIndex] - drawsInSlice.length;
    if (drawsInSlice.includes('e')) {
      if (numCardsLeftInSlice >= 2) { return 0; }
      else { return (1 / game.sliceSizes[sliceIndex + 1] * 100).toFixed(2); }
    } else {
      if (numCardsLeftInSlice === 2) { return 100; }
      else {
        const epidemicCombinations = numCardsLeftInSlice - 1;
        const allCombinations = math.combinations(numCardsLeftInSlice, 2);
        const epidemicChance = (epidemicCombinations / allCombinations * 100).toFixed(2);
        return epidemicChance;
      }
    }
  },

  _initSliceSizes: function(game) {
    const totalCards = Object.values(game.playerDeck).reduce( (accum, curValue) => accum + curValue);
    const numPiles = game.playerDeck.e;
    const smallPileSize = Math.floor(totalCards / numPiles);
    const bigPileSize = smallPileSize + 1;
    const numBigPiles = totalCards % (numPiles * smallPileSize);
    const numSmallPiles = numPiles - numBigPiles;
    let sliceSizes = [];
    for (let i = 0; i < numBigPiles; i++) {
      sliceSizes.push(bigPileSize);
    }
    for (let i = 0; i < numSmallPiles; i++) {
      sliceSizes.push(smallPileSize);
    }
    return sliceSizes;
  }
};
