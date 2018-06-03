module.exports = {
  // Expects array like ['b', 'b', 'r', 'p']
  initialDraw: function (self, initialCards) {
    for (let card of initialCards) {
      self.playerDeck[card]--;
    }
  },

  initSlices: function(self) {
    const totalCards = Object.values(self.playerDeck).reduce( (accum, curValue) => accum + curValue);
    const numPiles = self.playerDeck.e;
    const smallPileSize = Math.floor(totalCards / numPiles);
    const bigPileSize = smallPileSize + 1;
    const numBigPiles = totalCards % (numPiles * smallPileSize);
    const numSmallPiles = numPiles - numBigPiles;
    for (let i = 0; i < numBigPiles; i++) {
      self.epidemicSlices.push(bigPileSize);
    }
    for (let i = 0; i < numSmallPiles; i++) {
      self.epidemicSlices.push(smallPileSize);
    }
  },

  // Expects array like ['b', 'b']
  draw: function(self, cards) {
    for (let card of cards) {
      self.playerDeck[card]--;
    }
  },

  showStatus: function(self) {
    console.log('== Player Deck ==');
    const totalCardsLeft = Object.values(self.playerDeck).reduce( (accum, curValue) => accum + curValue);
    for (let [card, numLeft] of Object.entries(self.playerDeck)) {
      let epidemicChance = Math.round(numLeft / totalCardsLeft * 100);
      console.log(`${card}: ${numLeft}/${totalCardsLeft} (${epidemicChance}%)`);
    }
  }

};
