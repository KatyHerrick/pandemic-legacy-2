module.exports = {

  // Expects array like ['b', 'b', 'r', 'p']
  initialDraw: function (self, initialCards) {
    for (let card of initialCards) {
      self.playerDeck[card]--;
    }
  }
}
