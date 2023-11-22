<!--components/GameTile.vue-->

<template>
  <div
    class="game-tile"
    @click="tileClicked"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
    :class="{ 'hover-effect': hovering, selected: isSelected }"
  >
    <img :src="tileImage" alt="Game Tile" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TilePosition } from "@/types/types";

export default defineComponent({
  name: "GameTile",
  props: {
    tileImage: String,
    position: {
      type: Object as () => TilePosition,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const hovering = ref(false);

    return {
      hovering,
    };
  },
  methods: {
    tileClicked() {
      this.$emit("tile-clicked", this.position);
    },
  },
});
</script>

<style scoped>
.game-tile {
  width: 50px;
  height: 50px;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.game-tile img {
  max-width: 100%;
  max-height: 100%;
}

.game-tile.hover-effect {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.game-tile.selected {
  border: 2px solid #ffcc00;
}
</style>
