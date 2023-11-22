<!--Highscores.vue-->
<template>
  <div class="high-scores-page">
    <div class="scoreboard-container">
      <Scoreboard :scores="topScores" title="Top 10 High Scores" />
    </div>
    <div class="scoreboard-container">
      <Scoreboard :scores="playerTopScores" title="Your Top 3 Games" />
    </div>
  </div>
</template>

<script lang="ts">
import Scoreboard from '@/components/ScoreBoard.vue';
import { Game } from '@/store/modules/game';
import { computed } from 'vue';
import { mapGetters, useStore } from 'vuex';

export default {
  components: {
    Scoreboard
  },
  setup() {
    const store = useStore();
    const allGames = store.getters['game/allGames'];

    const topScores = computed(() => {
      return allGames
        .filter((game: Game) => game.completed)
        .sort((a: Game, b: Game) => b.score - a.score)
        .slice(0, 10);
    });

    const playerTopScores = computed(() => {
      const playerId = store.state.user.id; // Assuming the player ID is stored here
      return allGames
        .filter((game: Game) => game.completed && game.playerId === playerId)
        .sort((a: Game, b: Game) => b.score - a.score)
        .slice(0, 3);
    });

    const token = store.state.user.token; // Retrieve the token
    store.dispatch('game/fetchGames', token);

    return { topScores, playerTopScores };
  }
};
</script>


<style>
.high-scores-page {
  display: flex;
  justify-content: space-around;
}
.scoreboard-container {
  flex: 1;
  /* Additional styling */
}
</style>
