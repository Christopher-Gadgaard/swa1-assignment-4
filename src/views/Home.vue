<!--views/home.vue-->
<template>
  <div class="home">
    <img
      class="game-logo-home"
      src="@/assets/GemQuest.png"
      alt="Gem Quest Logo"
    />
    <Home />
  </div>
</template>

<script lang="ts">
import Home from "@/components/Home.vue";
export default {
  components: {
    Home,
  },
};
</script>
<style>
.game-logo-home {
  background-color: rgb(66, 66, 66);
  border-radius: 20px;
  max-width: 200px;
  margin-bottom: 2rem;
}
</style>
