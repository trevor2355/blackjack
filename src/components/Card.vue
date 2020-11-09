<template>
  <div>
    <div v-if="!cardHidden" class="card" :class="color">
      <div class="text" :class="color">{{ card }}</div>
    </div>
    <div v-if="cardHidden" class="hidden-card"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop() card!: string;
  @Prop() index!: number;
  @Prop() displayAllCards!: boolean;

  get cardHidden() {
    if (this.displayAllCards) {
      return false;
    } else {
      return this.index === 0;
    }
  }
  get color() {
    if (this.card.includes("♥") || this.card.includes("♦")) {
      return "red";
    } else {
      return "black";
    }
  }
}
</script>
<style scoped>
.card {
  border-width: 3px;
  border-style: solid;
  margin: 4px;
  width: 72px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text {
  text-align: center;
  font-size: 32px;
}
.black {
  border-color: rgb(27, 27, 27);
  color: rgb(27, 27, 27);
}
.red {
  border-color: rgb(216, 34, 34);
  color: rgb(216, 34, 34);
}
.hidden-card {
  border-width: 3px;
  border-style: solid;
  border-color: rgb(58, 58, 58);
  background-color: rgb(58, 58, 58);
  margin: 4px;
  width: 72px;
  height: 120px;
}
</style>
