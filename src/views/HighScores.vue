<!--Highscores.vue-->
<template>
  <div class="high-scores-page">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="scoreboards-container">
      <div class="scoreboard-container">
        <Scoreboard :scores="topScores" title="Top 10 High Scores" />
      </div>
      <div class="scoreboard-container">
        <Scoreboard :scores="playerTopScores" title="Your Top 3 Games" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scoreboard from '@/components/ScoreBoard.vue';
import { Game } from '@/store/modules/game';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    Scoreboard
  },
  setup() {
    const store = useStore();
    const isLoading = ref(true);

    // Define computed properties
    const topScores = computed(() => {
      return store.state.game.games
        .filter((game: Game) => game.completed)
        .sort((a: Game, b: Game) => b.score - a.score)
        .slice(0, 10);
    });

    const playerTopScores = computed(() => {
  const playerId = store.state.user.user.id; 
  console.log('Player ID:', playerId);
  console.log('All Games:', store.state.game.games);

  return store.state.game.games
    .filter((game: Game) => game.completed && game.user === playerId)
    .sort((a: Game, b: Game) => b.score - a.score)
    .slice(0, 3);
});



    onMounted(async () => {
      if (store.state.user.token) {
        await store.dispatch('game/fetchGames', store.state.user.token);
      }
      isLoading.value = false;
    });

    return { topScores, playerTopScores, isLoading };
  }
};
</script>



<style>
.high-scores-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scoreboards-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.scoreboard-container {
  flex: 1;
  /* Additional styling */
}
</style>