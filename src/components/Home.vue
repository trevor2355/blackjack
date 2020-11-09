<template>
  <div class="container">
    <h1>BlackJack</h1>
    <Scoreboard
      :dealer="dealer"
      :players="players"
      :scoreMessage="scoreMessage"
    />
    <Dealer :dealer="dealer" />
    <div>
      <div class="players-container">
        <h3>Players</h3>
      </div>
      <Player
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        v-on:hit="dealToPlayer"
        v-on:hold="playerHold"
        :index="index"
      />
    </div>
    <button v-if="!gameStarted" @click="startGame">Start Game</button>
    <button v-if="gameOver" @click="resetGameAndStart">
      Start Another Game
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Scoreboard from "@/components/Scoreboard.vue";
import Dealer from "@/components/Dealer.vue";
import Player from "@/components/Player.vue";
import PlayerInterface from "@/models/PlayerInterface";
import Deck from "@/data/Deck";
import {
  calculateGameScore,
  calculateTotalScore
} from "@/data/scoreCalculations";

@Component({
  components: {
    Scoreboard,
    Dealer,
    Player
  }
})
export default class Home extends Vue {
  dealer: PlayerInterface = {
    name: "Dealer",
    gameScore: 0,
    totalScore: 0,
    cards: [],
    isHolding: false
  };
  players: PlayerInterface[] = [
    {
      name: "Player 1",
      gameScore: 0,
      totalScore: 0,
      cards: [],
      isHolding: false
    }
  ];
  deck: Deck = new Deck(1);
  scoreMessage = "";

  get gameStarted() {
    return this.dealer.cards.length > 0;
  }

  get gameOver() {
    return this.dealer.isHolding;
  }

  get allPlayersHolding() {
    return this.players.every(player => player.isHolding);
  }

  startGame() {
    this.deck.shuffleDeck();
    this.dealToDealer();
    this.dealToDealer();
    this.players.forEach((player, index) => {
      this.dealToPlayer(index);
      this.dealToPlayer(index);
    });
  }

  resetGameAndStart() {
    this.deck = new Deck(1);
    this.dealer.cards = [];
    this.dealer.gameScore = 0;
    this.dealer.isHolding = false;
    this.players.forEach(player => {
      player.cards = [];
      player.isHolding = false;
      player.gameScore = 0;
    });
    this.scoreMessage = "";
    this.startGame();
  }

  dealToDealer() {
    const card = this.deck.dealCard();
    if (card) {
      this.dealer.cards.push(card);
      this.dealer.gameScore = calculateGameScore(this.dealer.cards);
    }
  }

  dealToPlayer(playerIndex: number) {
    const card = this.deck.dealCard();
    if (card) {
      this.players[playerIndex].cards.push(card);
      this.players[playerIndex].gameScore = calculateGameScore(
        this.players[playerIndex].cards
      );
    }
    if (this.players[playerIndex].gameScore > 21) {
      this.dealer.isHolding = true;
      this.calculateAllTotalScores();
    }
  }

  playerHold(playerIndex: number) {
    this.players[playerIndex].isHolding = true;
    if (this.allPlayersHolding) {
      this.takeDealersTurn();
    }
  }

  takeDealersTurn(): void {
    if (this.dealer.gameScore < 17) {
      this.dealToDealer();
      return this.takeDealersTurn();
    } else {
      this.players.forEach(player => {
        if (this.dealer.gameScore < player.gameScore) {
          this.dealToDealer();
          return this.takeDealersTurn();
        }
      });
    }
    if (!this.dealer.isHolding) {
      this.dealerHold();
    }
    return;
  }

  dealerHold() {
    this.dealer.isHolding = true;
    this.calculateAllTotalScores();
  }

  calculateAllTotalScores() {
    const dealerScore = this.dealer.gameScore;
    const dealerNumOfCards = this.dealer.cards.length;
    this.players.forEach(player => {
      const updatedScores = calculateTotalScore(
        dealerScore,
        player.gameScore,
        dealerNumOfCards,
        player.cards.length
      );
      this.dealer.totalScore += updatedScores.dealer;
      player.totalScore += updatedScores.player;
      this.scoreMessage = updatedScores.message;
    });
  }
}
</script>

<style scoped>
h1 {
  margin-top: 0;
}
.container {
  position: relative;
}
.players-container {
  width: 33%;
  border-bottom: 2px solid rgb(192, 192, 192);
  margin: 0 auto 16px auto;
}
button {
  font-size: 24px;
  font-weight: 700;
  font-family: inherit;
  border: 0;
  padding: 12px;
  color: white;
  background-color: rgb(19, 126, 28);
  border-radius: 4px;
}
</style>
