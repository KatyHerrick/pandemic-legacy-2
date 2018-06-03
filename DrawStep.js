module.exports = {
  // Expects array like ['b', 'b', 'r', 'p']
  initialDraw: function (game, initialCards) {
    for (let card of initialCards) {
      game.playerDeck[card]--;
    }
  },

  initSlices: function(game) {
    const sliceSizes = this._initSliceSizes(game);
    return sliceSizes;
  },

  // Expects array like ['b', 'b']
  draw: function(game, cards) {
    for (let card of cards) {
      game.playerDeck[card]--;
    }
  },

  showStatus: function(game) {
    console.log('== Player Deck ==');
    const totalCardsLeft = Object.values(game.playerDeck).reduce( (accum, curValue) => accum + curValue);
    for (let [card, numLeft] of Object.entries(game.playerDeck)) {
      let epidemicChance = Math.round(numLeft / totalCardsLeft * 100);
      console.log(`${card}: ${numLeft}/${totalCardsLeft} (${epidemicChance}%)`);
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
