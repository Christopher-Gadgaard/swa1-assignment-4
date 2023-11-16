<!-- gameView -->
<template>
  <div class="Game">
    <h1>Welcome to the Match-Three Game!</h1>
    <div class="game-container">
      <GameBoard></GameBoard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameBoard from "../../components/game/GameBoard.vue"; 

export default defineComponent({
  name: "GameView",
  components: {
    GameBoard, 
  },
});
</script>

<style scoped>
.Game {
  text-align: center; 
  padding-top: 20px; 
}

.game-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; 
}
</style>
