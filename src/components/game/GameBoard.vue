<!-- GameBoard.vue -->
<template>
  <div class="game-board">
    <div
      v-for="(row, rowIndex) in board.getGrid()"
      :key="`row-${rowIndex}`"
      class="board-row"
    >
      <div
        v-for="(tile, colIndex) in row"
        :key="`col-${colIndex}`"
        class="board-tile"
        @click="tileClicked(rowIndex, colIndex)"
      >
        <img :src="require(`@/assets/${tile.svgPath}`)" alt="Game Tile" /> <!-- Display the SVG here -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GameBoard } from "@/models/GameBoard";

export default defineComponent({
  name: "GameBoard",
  data() {
    return {
      board: new GameBoard(8, 8), // 8x8 grid for example
    };
  },
  methods: {
    tileClicked(row: number, col: number) {
      // Handle the tile click event
      console.log(`Tile clicked: row ${row} col ${col}`);
      // You'll expand this method to actually handle moves, etc.
    },
  },
});
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  margin: auto; /* This can help with centering in some layouts */
  max-width: 600px; /* Adjust as needed */
  border: 2px solid #000; /* Example styling */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Just an example for some shadow */
}
.board-row {
  display: flex;
}
.board-tile {
  width: 50px; /* You can adjust the size as necessary */
  height: 50px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
/* Add styles for different tile types here */
.tile-type-A {
  background-color: red;
}
.tile-type-B {
  background-color: blue;
}
.tile-type-C {
  background-color: green;
}

.board-tile img {
  max-width: 100%;
  max-height: 100%;
}
</style>
