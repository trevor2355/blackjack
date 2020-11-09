import cardOptions from "@/models/cardOptions";

const pointLookUp: any = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "1": 10,
  J: 10,
  Q: 10,
  K: 10
};

const calculateGameScore = (cards: cardOptions[]): number => {
  let score = 0;
  let aceCount = 0;

  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    if (card.includes("A")) {
      aceCount += 1;
    } else {
      score += pointLookUp[card[0]];
    }
  }

  // If they have aces and the score + additional aces is less than or equal to ten we want to count it as 11
  while (aceCount > 0) {
    const acesLeft = aceCount - 1;
    if (score + acesLeft <= 10) {
      score += 11;
    } else {
      // if the total score is greater than 10 we want to count it as a 1
      score += 1;
    }
    aceCount--;
  }

  return score;
};

const had21OnDeal = (score: number, numberOfCards: number) => {
  if (numberOfCards === 2 && score === 21) {
    return true;
  } else {
    return false;
  }
};

const calculateTotalScore = (
  dealerScore: number,
  playerScore: number,
  dealerNumberOfCards: number,
  playerNumberOfCards: number
) => {
  const scores = {
    dealer: 0,
    player: 0,
    message: ""
  };

  if (playerScore > 21) {
    scores.dealer += 1;
    scores.message = "Dealer scores 1 point";
  } else if (
    had21OnDeal(dealerScore, dealerNumberOfCards) &&
    had21OnDeal(playerScore, playerNumberOfCards)
  ) {
    scores.player += 1;
    scores.dealer += 1;
    scores.message = `Dealer and player score 1 point`;
  } else if (
    had21OnDeal(playerScore, playerNumberOfCards) &&
    dealerScore !== 21
  ) {
    scores.player += 2;
    scores.message = `player scores 2 points`;
  } else if (had21OnDeal(dealerScore, dealerNumberOfCards)) {
    scores.dealer += 2;
    scores.message = "Dealer scores 2 point";
  } else if (dealerScore > 21) {
    scores.player += 1;
    scores.message = `player scores 1 point`;
  } else if (dealerScore > playerScore) {
    scores.dealer += 1;
    scores.message = "Dealer scores 1 point";
  } else if (playerScore > dealerScore) {
    scores.player += 1;
    scores.message = `player scores 1 point`;
  } else if (playerScore === dealerScore) {
    scores.dealer += 1;
    scores.message = "Dealer scores 1 point";
  }

  return scores;
};

export { calculateGameScore, had21OnDeal, calculateTotalScore };
