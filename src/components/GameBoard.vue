<!--Gamebaord.vue-->
<template>
  <div class="game-board">
    <div v-for="(row, rowIndex) in boardData" :key="rowIndex" class="board-row">
      <GameTile
        v-for="(tile, colIndex) in row"
        :key="colIndex"
        :tileImage="getTileImage(tile)"
        :position="{ row: rowIndex, col: colIndex }"
        @tile-clicked="handleTileClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import GameTile, { TilePosition } from './GameTile.vue';

// Define available tile types based on your SVG filenames
const tileTypes = ['astronaut', 'brain-slug', 'galaxy', 'laser-gun', 'millennium-falcon', 'saturn'];

interface Tile {
  type: string;
}

export default defineComponent({
  name: 'GameBoard',
  components: {
    GameTile
  },
  props: {
    width: {
      type: Number,
      default: 8 // default value if not provided
    },
    height: {
      type: Number,
      default: 8 // default value if not provided
    }
  },
  setup(props) {
    const boardData = ref<Array<Array<Tile>>>([]);

    // Function to generate a random tile
    const getRandomTile = (): Tile => {
      const randomIndex = Math.floor(Math.random() * tileTypes.length);
      return { type: tileTypes[randomIndex] };
    };

    // Function to generate the board with random tiles
    const generateBoard = (): void => {
      boardData.value = Array.from({ length: props.height }, () =>
        Array.from({ length: props.width }, () => getRandomTile())
      );
    };

    // Generate board on component mount
    onMounted(generateBoard);

    return { boardData, getRandomTile, generateBoard };
  },
  methods: {
    getTileImage(tile: Tile): string {
      // Return the path to the SVG based on the tile type
      return require(`@/assets/${tile.type}.svg`);
    },
    handleTileClick(position: TilePosition) {
      // Logic to handle tile click
      console.log('Tile clicked:', position);
    }
  }
});
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
}

.board-row {
  display: flex;
}
</style>
