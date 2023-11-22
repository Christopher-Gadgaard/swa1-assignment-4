<!--ScoreBoard.vue-->

<template>
  <div class="scoreboard">
    <h2>{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in scores" :key="index">
          <td>{{ score.playerId }}</td>
          <td>{{ score.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Game } from "@/store/modules/game";

export default {
  props: {
    scores: {
      type: Array as () => Game[],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
