<template>
  <div>
    <div class="dealer-container">
      <h3>{{ dealer.name }}</h3>
    </div>
    <div>Score: {{ shownScore }}</div>
    <div class="cards">
      <Card
        v-for="(card, index) in dealer.cards"
        :key="index"
        :card="card"
        :index="index"
        :displayAllCards="dealer.isHolding"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import IPlayer from "@/models/IPlayer";

@Component({
  components: {
    Card
  }
})
export default class Dealer extends Vue {
  @Prop() dealer!: IPlayer;

  get shownScore(): string {
    if (!this.dealer.isHolding) {
      return "?";
    } else {
      return this.dealer.gameScore.toString();
    }
  }
}
</script>
<style scoped>
h3 {
  color: rgb(27, 27, 27);
  margin-bottom: 4px;
}
.dealer-container {
  width: 25%;
  border-bottom: 2px solid rgb(192, 192, 192);
  margin: 0 auto 16px auto;
}
.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 24px;
}
</style>
