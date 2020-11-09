<template>
  <div class="score-container">
    <div class="scoreboard">
      <h3>Scoreboard</h3>
      <div class="person-score">
        <div>Dealer:</div>
        <div>{{ dealer.totalScore }}</div>
      </div>
      <div v-for="player in players" :key="player.name" class="person-score">
        <div>{{ player.name }}:</div>
        <div>{{ player.totalScore }}</div>
      </div>
    </div>
    <div class="score-message">{{ scoreMessage }}</div>
  </div>
</template>

<script lang="ts">
import PlayerInterface from "@/models/PlayerInterface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Scoreboard extends Vue {
  @Prop() dealer!: PlayerInterface;
  @Prop() players!: PlayerInterface[];
  @Prop() scoreMessage!: string;
}
</script>
<style scoped>
.score-container {
  position: absolute;
  top: 8%;
  right: 8%;
}
.scoreboard {
  border: 2px solid black;
  padding: 16px;
}
.person-score {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.score-message {
  margin: 16px;
  color: rgb(216, 34, 34);
}
h3 {
  color: rgb(27, 27, 27);
  margin-top: 0px;
}
</style>
