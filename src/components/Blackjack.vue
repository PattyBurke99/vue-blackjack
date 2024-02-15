<script>
  const cardback = 'https://deckofcardsapi.com/static/img/back.png' 

  function newCard(card, facedown) {
      this.value = card.value;
      this.suit = card.suit;
      this.facedown = facedown;
      if (!facedown) {
          this.img = card.images.png;
      } else {
          this.img = cardback;
          this.imgflipped = card.images.png;
      }
  } 

  const app = {
    data() {
        return {
            deckId: '',
            playerCards: [],
            dealerCards: [],
            playerCardValue: {},
            dealerCardValue: {},
            cardsInDeck: 'N/a',
            inPlay: false,
            standing: false,
            money: 100,
            bet: 0,
            showMessage: false,
            message: ''
        }
    },
    methods: {
        async fetchNewDeck() {
            const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
            const deck = await response.json();
            this.deckId = deck.deck_id;
        },        
        async dealCard(target, isPlayer, facedown) {
            const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
            const card = await response.json(); 

            target.push(new newCard(card.cards[0], facedown));

            if (isPlayer) {
                this.playerCardValue = this.calculateValue(target);
            } else {
                this.dealerCardValue = this.calculateValue(target);
            }

            this.cardsInDeck = card.remaining;
        },
        async dealHand() {
            if (this.deckId == '') {
                this.cardsInDeck = 'Fetching Deck...'
                await this.fetchNewDeck();
            }

            this.inPlay = true;
            this.money -= this.bet;

            await this.dealCard(this.playerCards, true, false);
            await this.dealCard(this.playerCards, true, false);
            await this.dealCard(this.dealerCards, false, true);
            await this.dealCard(this.dealerCards, false, false);

            if (this.playerCardValue.blackjack && this.dealerCardValue.blackjack) {
                this.dealerCards[0].img = this.dealerCards[0].imgflipped;
                this.displayMessage('Player AND Dealer Blackjack! Tie!')
                this.money += this.bet;
            } else if (this.playerCardValue.blackjack) {
                this.displayMessage('Player Blackjack! You Win!');
                this.money += 2*this.bet
                setTimeout(this.handReset, 3000);
            } 
        },
        async hit() {
            await this.dealCard(this.playerCards, true, false);

            if (this.playerCardValue.value > 21) { 
                this.displayMessage(`You are bust! (${this.playerCardValue.value})`)
                this.dealerCards = [];
                this.bet = 0;

                setTimeout(this.bustReset, 3000);
            }
        },
        async stand() {
            this.standing = true;

            if (this.playerCardValue.or <= 21) {
                this.playerCardValue.value = this.playerCardValue.or;
            }
            
            this.dealerCards[0].img = this.dealerCards[0].imgflipped;
            this.dealerCardValue = this.calculateValue(this.dealerCards);

            if (this.dealerCardValue.blackjack) {
                this.displayMessage('Dealer Blackjack! You Lose!');
                setTimeout(this.handReset, 3000);
                return;
            }

            while (this.dealerCardValue.value < 17) {
                if (this.dealerCardValue.or >= 17 && this.dealerCardValue.or <= 21) {
                    this.dealerCardValue.value = this.dealerCardValue.or;
                    break;
                }

                await this.dealCard(this.dealerCards, false, false);
            }
            
            if (this.dealerCardValue.value > 21) {
                this.displayMessage('Dealer Bust! You Win!');
                this.money += 2*this.bet;
                setTimeout(this.handReset, 3000);
            }
            else if (this.dealerCardValue.value < this.playerCardValue.value) {
                this.displayMessage('You Win!');
                this.money += 2*this.bet;
                setTimeout(this.handReset, 3000);
            } else if (this.dealerCardValue.value == this.playerCardValue.value) {
                this.displayMessage('Draw!');
                this.money += this.bet;
                setTimeout(this.handReset, 3000);
            } else {
                this.displayMessage('You Lose!');
                setTimeout(this.handReset, 3000);
            }
        },
        betUp() {
            if (this.money - (this.bet + 5) >= 0) {
                this.bet += 5;
            }
        },  
        betDown() {
            if (this.bet - 5 >= 0) {
                this.bet-= 5;
            }
        },
        calculateValue(cards) {
            let black = false
            let jack = false;
            let value = cards.reduce((total, card) => {
                switch (card.value) {
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        total.value = total.value + parseInt(card.value);
                        total.or = total.or + parseInt(card.value);
                        break;
                    case '10':
                    case 'JACK':
                    case 'QUEEN':
                    case 'KING':
                        jack = true;
                        total.value = total.value + 10;
                        total.or = total.or + 10;
                        break;
                     case 'ACE':
                        black = true;
                        if (total.or == total.value) {
                            total.or += 11;
                        } else {
                            total.or++;
                        }
                        total.value++;
                        break;
                }
                return total;
            }, {value: 0, or: 0});

            if (cards.length == 2 && black && jack) {
                value.blackjack = true;
            }

            return value;
        },
        displayMessage(message) {
            this.message = message;
            this.showMessage = true;
        },
        bustReset() {
            this.showMessage = false;
            this.inPlay = false;
            this.playerCards = [];
            this.playerCardValue = {};
            this.dealerCardValue = {};
        },
        handReset() {
            this.bet = 0;
            this.showMessage = false;
            this.standing = false;
            this.inPlay = false;
            this.playerCards = [];
            this.dealerCards = [];
            this.playerCardValue = {};
            this.dealerCardValue = {};
        }
    },
    computed: {
        displayPlayerOr() {
            return (this.playerCardValue.value !== this.playerCardValue.or) && this.playerCardValue.or <= 21;
        },
        displayDealerOr() {
            return (this.dealerCardValue.value !== this.dealerCardValue.or) && this.dealerCardValue.or <= 21;
        }
    }
  }

  export default app;
</script>

<template>
  <div id="game">
    <h2 id="money"> Wallet: ${{ money }} </h2>
    <h4 id="deck">Cards in Deck(s): {{ cardsInDeck }}</h4>
    <ul id="value">
      <li> Player Value: {{ playerCardValue.value }}
          <span v-if="displayPlayerOr">OR&nbsp;{{ playerCardValue.or }}</span>
      </li>
      <li v-if="standing"> Dealer Value: {{ dealerCardValue.value }}
          <span v-if="displayDealerOr">OR&nbsp;{{ dealerCardValue.or }}</span>
      </li>
    </ul>
    <div v-if="!inPlay" id="bet">
        <button @click="betDown">-</button>
        <span>Bet: ${{ bet }} </span><button @click="betUp">+</button>
    </div>
    <div v-if="showMessage" id="message"> {{ message }} </div>
    <div id="dealercards">
        <img class="card" v-for="card in dealerCards" :src="card.img">
    </div>
    <div id="playercards">
        <img class="card" v-for="card in playerCards" :src="card.img">
    </div>
    <div id="controls">
        <button :disabled="(bet <= 0 && !inPlay) || inPlay" @click="dealHand">Deal Cards</button>
        <button :disabled="!inPlay || showMessage || standing" @click="hit">Hit</button>
        <button :disabled="!inPlay || showMessage || standing" @click="stand">Stand</button>
    </div>
  </div>
</template>