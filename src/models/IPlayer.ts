import cardOptions from "@/models/cardOptions";

export default interface IPlayer {
  name: string;
  gameScore: number;
  totalScore: number;
  cards: cardOptions[];
  isHolding: boolean;
}
