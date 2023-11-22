<!--views/Game.vue-->
<template>
  <div class="game-view-container">
    <!-- Logo image -->
    <img class="game-logo" src="@/assets/GemQuest.png" alt="Gem Quest Logo" />
    <!-- GameBoard component -->
    <GameBoard :width="8" :height="8" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameBoard from "@/components/GameBoard.vue";

export default defineComponent({
  name: "GameView",
  components: {
    GameBoard,
  },
});
</script>

<style>
.game-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5vh;
  text-align: center;
  height: 90vh;
  background-image: url("../assets/SpaceBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.game-logo {
  max-width: 200px;
  margin-bottom: 2rem;
}
</style>
