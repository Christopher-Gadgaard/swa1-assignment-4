<template>
  <div class="game-view-container">
    <!-- Logo image -->
    <img class="game-logo" src="@/assets/GemQuest.png" alt="Gem Quest Logo" />
    <!-- GameBoard component -->
    <GameBoard :width="8" :height="8" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameBoard from '@/components/GameBoard.vue';

export default defineComponent({
  name: 'GameView',
  components: {
    GameBoard
  },
});
</script>

<style>
/* Add styles here */
.game-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the start of the container */
  padding-top: 5vh; /* 10% from the top of the viewport height */
  text-align: center;
  height: 90vh; /* Take up the rest of the height to push content to the top */
  background-image: url("../assets/SpaceBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
}


.game-logo {
  max-width: 200px; /* Adjust the width as needed */
  margin-bottom: 2rem;
}
</style>
