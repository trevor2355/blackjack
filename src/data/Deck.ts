import cardOptions from "@/models/cardOptions";

export default class Deck {
  deck: cardOptions[];
  private numberOfDecks: number;

  constructor(numOfDecks: number) {
    // The constructor takes in an argument of how many decks you would like in the entire deck
    // Right now it isn't functioning but can be implemented later.
    this.numberOfDecks = numOfDecks;
    this.deck = [
      "A♥",
      "2♥",
      "3♥",
      "4♥",
      "5♥",
      "6♥",
      "7♥",
      "8♥",
      "9♥",
      "10♥",
      "J♥",
      "Q♥",
      "K♥",
      "A♣",
      "2♣",
      "3♣",
      "4♣",
      "5♣",
      "6♣",
      "7♣",
      "8♣",
      "9♣",
      "10♣",
      "J♣",
      "Q♣",
      "K♣",
      "A♠",
      "2♠",
      "3♠",
      "4♠",
      "5♠",
      "6♠",
      "7♠",
      "8♠",
      "9♠",
      "10♠",
      "J♠",
      "Q♠",
      "K♠",
      "A♦",
      "2♦",
      "3♦",
      "4♦",
      "5♦",
      "6♦",
      "7♦",
      "8♦",
      "9♦",
      "10♦",
      "J♦",
      "Q♦",
      "K♦"
    ];
  }

  shuffleDeck(): void {
    const shuffledDeck: cardOptions[] = [];
    while (this.deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const spliced = this.deck.splice(randomIndex, 1);
      shuffledDeck.push(spliced[0]);
    }
    this.deck = shuffledDeck;
  }

  dealCard(): cardOptions | undefined {
    if (this.deck.length > 0) {
      return this.deck.pop();
    }
  }
}
