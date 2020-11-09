import cardOptions from "@/models/cardOptions";

export default interface PlayerInterface {
  name: string;
  gameScore: number;
  totalScore: number;
  cards: cardOptions[];
  isHolding: boolean;
}
