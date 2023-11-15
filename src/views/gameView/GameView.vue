<!-- gameView -->
<template>
  <div class="Game">
    <h1>Welcome to the Match-Three Game!</h1>
    <GameBoard></GameBoard>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { GameBoard } from "@/models/GameBoard";

export default defineComponent({
  name: "GameView",
  components: {
    GameBoard,
  },
});
</script>

<style scoped>
/* Add styles specific to the home view here */
</style>
