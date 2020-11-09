<template>
  <div>
    <h4>{{ player.name }}</h4>
    <div>Score: {{ player.gameScore }}</div>
    <div class="cards">
      <Card
        v-for="(card, index) in player.cards"
        :key="index"
        :card="card"
        :index="index"
        :displayAllCards="true"
      />
    </div>
    <button
      v-if="player.gameScore > 0 && player.gameScore < 21 && !player.isHolding"
      @click="hit"
    >
      Hit
    </button>
    <button
      v-if="player.gameScore > 0 && player.gameScore <= 21 && !player.isHolding"
      @click="hold"
    >
      Hold
    </button>
    <div class="bust" v-if="player.gameScore > 21">BUST</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import PlayerInterface from "@/models/PlayerInterface";

@Component({
  components: {
    Card
  }
})
export default class Player extends Vue {
  @Prop() player!: PlayerInterface;
  @Prop() index!: number;

  hit() {
    this.$emit("hit", this.index);
  }

  hold() {
    this.$emit("hold", this.index);
  }

  bust() {
    this.$emit("playerBust", this.index);
  }
}
</script>
<style scoped>
h4 {
  color: rgb(27, 27, 27);
}
.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 24px;
}
button {
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  border: 0;
  padding: 12px;
  background-color: rgb(192, 192, 192);
  border-radius: 4px;
  margin: 16px;
}
.bust {
  font-size: 32px;
  color: rgb(216, 34, 34);
  margin-bottom: 16px;
}
</style>
