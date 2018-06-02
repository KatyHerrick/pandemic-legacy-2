module.exports = {
  // Expects array like ['was', 'lon']
  initialDraw: function (self, initialCards) {
    for (let card of initialCards) {
      self.infectionDeck[card]--;
    }
  }
}
