module.exports = {
  initDiscardHistory: function(game) {
    let discardHistory = {};
    for (let i = 0; i < game.playerDeck.e; i++) {
      discardHistory[i] = [];
    };
    game.discardHistory = discardHistory;
    game.historyIndex = 0;
  },

  // Expects array like ['was', 'lon']
  initialDraw: function (game, initialCards) {
    for (let card of initialCards) {
      game.infectionDeck[card]--;
      game.discardHistory[0].push(card);
    }
  },

  draw: function(game, cards) {
    for (let card of cards) {
      game.infectionDeck[card]--;
      game.discardHistory[game.historyIndex].push(card);
    }
  },

  showStatus: function(game) {
    console.log('== Infection Deck ==');
    console.log(game.discardHistory);
  }
};
