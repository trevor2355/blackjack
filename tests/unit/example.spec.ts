import {
  calculateTotalScore,
  calculateGameScore,
  had21OnDeal
} from "@/data/scoreCalculations";
import cardOptions from "@/models/cardOptions";

describe("Test Score Calculations", () => {
  it("Should give the dealer 1 point when the player busts", () => {
    let dealerScore = 22;
    let playerScore = 22;
    let dealerNumberOfCards = 3;
    let playerNumberOfCards = 3;
    let result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(1);
    expect(result.player).toBe(0);
    dealerScore = 19;
    playerScore = 29;
    dealerNumberOfCards = 2;
    playerNumberOfCards = 5;
    result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(1);
    expect(result.player).toBe(0);
  });
  it("Should give the dealer and the player 1 point when they both had 21 on the deal", () => {
    const dealerScore = 21;
    const playerScore = 21;
    const dealerNumberOfCards = 2;
    const playerNumberOfCards = 2;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(1);
    expect(result.player).toBe(1);
  });
  it("Should give the player 2 points when they had 21 on the deal and dealer did not get 21", () => {
    const dealerScore = 27;
    const playerScore = 21;
    const dealerNumberOfCards = 3;
    const playerNumberOfCards = 2;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(0);
    expect(result.player).toBe(2);
  });
  it("Should give the dealer 2 points when they had 21 on the deal", () => {
    const dealerScore = 21;
    const playerScore = 20;
    const dealerNumberOfCards = 2;
    const playerNumberOfCards = 3;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(2);
    expect(result.player).toBe(0);
  });
  it("Should give the player 1 point if the dealer busts", () => {
    const dealerScore = 22;
    const playerScore = 17;
    const dealerNumberOfCards = 3;
    const playerNumberOfCards = 2;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(0);
    expect(result.player).toBe(1);
  });
  it("Should give the dealer 1 point when they score higher than the player", () => {
    const dealerScore = 19;
    const playerScore = 18;
    const dealerNumberOfCards = 3;
    const playerNumberOfCards = 2;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(1);
    expect(result.player).toBe(0);
  });
  it("Should give the player 1 point when they score higher than the dealer", () => {
    const dealerScore = 19;
    const playerScore = 21;
    const dealerNumberOfCards = 3;
    const playerNumberOfCards = 3;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(0);
    expect(result.player).toBe(1);
  });
  it("Should give the dealer 1 point when the player and dealer have the same score", () => {
    const dealerScore = 19;
    const playerScore = 19;
    const dealerNumberOfCards = 2;
    const playerNumberOfCards = 4;
    const result = calculateTotalScore(
      dealerScore,
      playerScore,
      dealerNumberOfCards,
      playerNumberOfCards
    );
    expect(result.dealer).toBe(1);
    expect(result.player).toBe(0);
  });
});

// this.deck = ["A♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥", "A♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣", "A♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠", "A♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦"]

describe("Game Score Calculations", () => {
  it("Should calculate scores correctly without aces", () => {
    let cards: cardOptions[] = ["9♠", "2♥", "7♠", "3♣"];
    let score = calculateGameScore(cards);
    expect(score).toBe(21);
    cards = ["Q♥", "K♠", "3♣"];
    score = calculateGameScore(cards);
    expect(score).toBe(23);
    cards = ["2♦", "2♥", "2♠", "3♣"];
    score = calculateGameScore(cards);
    expect(score).toBe(9);
  });

  it("Should calculate scores correctly with aces", () => {
    let cards: cardOptions[] = ["A♥", "2♠"];
    let score = calculateGameScore(cards);
    expect(score).toBe(13);

    cards = ["A♥", "2♠", "3♣", "5♥"];
    score = calculateGameScore(cards);
    expect(score).toBe(21);

    cards = ["A♥", "2♠", "3♣", "6♥"];
    score = calculateGameScore(cards);
    expect(score).toBe(12);

    cards = ["A♥", "K♠", "2♣"];
    score = calculateGameScore(cards);
    expect(score).toBe(13);

    cards = ["A♥", "K♠", "3♣", "6♥"];
    score = calculateGameScore(cards);
    expect(score).toBe(20);

    cards = ["A♥", "K♦", "J♣"];
    score = calculateGameScore(cards);
    expect(score).toBe(21);
  });

  it("Should calculate scores correctly with Multiple aces", () => {
    let cards: cardOptions[] = ["A♥", "A♠"];
    let score = calculateGameScore(cards);
    expect(score).toBe(12);

    cards = ["A♥", "A♠", "A♣"];
    score = calculateGameScore(cards);
    expect(score).toBe(13);

    cards = ["A♥", "A♠", "A♣", "A♦"];
    score = calculateGameScore(cards);
    expect(score).toBe(14);

    cards = ["A♥", "A♠", "8♠"];
    score = calculateGameScore(cards);
    expect(score).toBe(20);

    cards = ["A♥", "A♠", "K♠", "A♣", "A♦"];
    score = calculateGameScore(cards);
    expect(score).toBe(14);

    cards = ["A♥", "2♠", "3♣", "A♠", "K♠", "A♣", "A♦", "2♦"];
    score = calculateGameScore(cards);
    expect(score).toBe(21);

    cards = ["A♥", "A♠", "A♣", "A♦", "2♥", "2♠", "2♣", "2♦", "3♥", "3♠", "3♣"];
    score = calculateGameScore(cards);
    expect(score).toBe(21);
  });
});

describe("Dealt 21", () => {
  it("Should return true if the number of cards is two and the score is 21", () => {
    const score = 21;
    const numberOfCards = 2;
    const result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(true);
  });
  it("Should return false if the number of cards is more than 2 and the score is 21", () => {
    let score = 21;
    let numberOfCards = 3;
    let result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
    score = 21;
    numberOfCards = 4;
    result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
  });
  it("Should return false if the number of cards is 2 and the score is not 21", () => {
    let score = 20;
    let numberOfCards = 2;
    let result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
    score = 18;
    numberOfCards = 2;
    result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
    score = 6;
    numberOfCards = 2;
    result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
  });
  it("Should return false if the number of cards is greater than 2 and the score is not 21", () => {
    let score = 20;
    let numberOfCards = 3;
    let result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
    score = 19;
    numberOfCards = 4;
    result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
    score = 7;
    numberOfCards = 3;
    result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
    score = 20;
    numberOfCards = 8;
    result = had21OnDeal(score, numberOfCards);
    expect(result).toBe(false);
  });
});
