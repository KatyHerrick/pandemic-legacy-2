const inquirer = require('inquirer');
const playerDeck = require('./config/playerDeck');
const infectionDeck = require('./config/infectionDeck');
const DrawStep = require('./DrawStep');
const InfectStep = require('./InfectStep');

class Game {
  constructor() {
    this.playerDeck = playerDeck;
    this.infectionDeck = infectionDeck;
    this.playerCardTypes = Object.keys(playerDeck);
    this.infectionCardTypes = Object.keys(infectionDeck);
    this.epidemicSlices = [];
  }

  setUp(callback) {
    let questions = [
      {
        type: 'input',
        name: 'playerCards',
        message: 'First 8 player cards: ',
        validate: (value) => {
          let cards = value.split('');
          if (cards.length !== 8) { return 'You must draw 8 cards.';};
          for (let card of cards) {
            if (this.playerCardTypes.includes(card) === false) {
              return `"${card}" is not a valid card type.`;
            }
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'infectionCards',
        message: 'First 9 infection cards: ',
        validate: (value) => {
          let cards = value.split(' ');
          for (let card of cards) {
            if (this.infectionCardTypes.includes(card) === false) {
              return `"${card}" is not a valid city.`;
            }
          }
          return true;
        }
      },
    ];

    inquirer.prompt(questions)
      .then(answers => {
        let playerCards = answers.playerCards.split('');
        let infectionCards = answers.infectionCards.split(' ');
        DrawStep.initialDraw(this, playerCards);
        InfectStep.initialDraw(this, infectionCards);
        this.initialize();
        callback();
      });
  }

  initialize() {
    DrawStep.initSlices(this);
  }

  play() {
    let questions = [
      {
        type: 'input',
        name: 'playerCards',
        message: 'Player cards drawn: (Blue/b, Yellow/y, Black/k, Rationed/r, Produce/p, Epidemic/e)',
        validate: (value) => {
          let cards = value.split('');
          if (cards.length !== 2) { return 'You must draw 2 cards.';};
          for (let card of cards) {
            if (this.playerCardTypes.includes(card) === false) {
              return `"${card}" is not a valid card type.`;
            }
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'infectionCards',
        message: 'Infection cards drawn: ',
        validate: (value) => {
          let cards = value.split(' ');
          for (let card of cards) {
            if (this.infectionCardTypes.includes(card) === false) {
              return `"${card}" is not a valid city.`;
            }
          }
          return true;
        }
      },
    ];

    let loop = () => {
      inquirer.prompt(questions)
        .then(() => {
          loop();
        });
    };

    loop();
  }

}

const game = new Game();
game.setUp( () => {
  game.play();
});
