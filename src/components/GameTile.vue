<!--components/GameTile.vue-->

<template>
    <div class="game-tile" @click="tileClicked">
      <!-- Use an img tag to display the SVG -->
      <img :src="tileImage" alt="Game Tile" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { TilePosition } from "@/types/types"; 

  
  export default defineComponent({
    name: 'GameTile',
    props: {
      tileImage: String,
      position: {
        type: Object as () => TilePosition,
        required: true
      }
    },
    methods: {
      tileClicked() {
        this.$emit('tile-clicked', this.position);
      }
    }
  });
  </script>
  
  
  <style scoped>
  .game-tile {
    /* Add styles for your tiles here */
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .game-tile img {
    max-width: 100%;
    max-height: 100%;
  }
  </style>
  