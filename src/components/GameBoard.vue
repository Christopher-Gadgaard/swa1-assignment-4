<!-- components/GameBoard.vue -->
<template>
  <div class="game-board-container">
    <div class="card game-board">
      <div v-for="(row, rowIndex) in boardData" :key="rowIndex" class="board-row">
        <GameTile v-for="(tile, colIndex) in row" :key="colIndex" :tileImage="getTileImage(tile)"
          :position="{ row: rowIndex, col: colIndex }" :isSelected="isSelectedTile({ row: rowIndex, col: colIndex })"
          @tile-clicked="handleTileClick" />
      </div>
      <div class="game-info">
        <p>Score: {{ score }}</p>
        <p>Moves Left: {{ remainingMoves }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import GameTile from "./GameTile.vue";
import { Tile, TilePosition } from "@/types/types";
import { GameLogic } from "@/models/GameLogic";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default defineComponent({
  name: "GameBoard",
  components: {
    GameTile,
  },
  setup() {
    // ViewModel part: managing state and interactions
    const store = useStore();
    const token = store.state.user.token;
    console.log(token);
    const gameLogic = reactive(new GameLogic(8, 8, token));
    const selectedTile = ref<TilePosition | null>(null);
    const score = computed(() => gameLogic.getScore());
    const remainingMoves = computed(() => gameLogic.getRemainingMoves());
    const boardData = computed(() => gameLogic.getBoard());

    const isSelectedTile = (position: TilePosition) => {
      return (
        (selectedTile.value &&
          selectedTile.value.row === position.row &&
          selectedTile.value.col === position.col) ||
        false
      );
    };

    const handleTileClick = (position: TilePosition) => {
      if (selectedTile.value) {
        // If simulateSwap is true, then perform the actual swap
        if (gameLogic.simulateSwap(selectedTile.value, position)) {
          gameLogic.performSwap(selectedTile.value, position);
          gameLogic.processMatches();
        }
        selectedTile.value = null;
      } else {
        selectedTile.value = position;
      }
    };

    onMounted(async () => {
      try {
        await gameLogic.initializeGame();
        // Additional logic after game initialization
      } catch (error) {
        // Handle initialization error
        console.error("Failed to initialize the game:", error);
      }
    });

    // Expose state and methods to the template (View)
    return {
      boardData,
      score,
      remainingMoves,
      isSelectedTile,
      handleTileClick,
      getTileImage(tile: Tile): string {
        return require(`@/assets/${tile.type}.svg`);
      },
    };
  },
});
</script>

<style scoped>
.game-board-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.game-board {
  display: flex;
  flex-direction: column;
}

.game-info {
  text-align: center;
  margin-top: 15px;
}

.game-info p {
  margin: 5px 0;
  font-size: 1.2em;
}

.board-row {
  display: flex;
}
</style>
