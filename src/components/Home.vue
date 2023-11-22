<!--Components/Home.vue-->
<template>
  <div class="home">
    <h1>Welcome to the Game</h1>
    <section class="game-rules">
      <h2>Game Rules</h2>
      <p>Here's a brief overview of the game rules:</p>
      <ul>
        <li>Objective: Align three or more identical tiles to score points.</li>
        <li>
          Swapping Tiles: Select and swap adjacent tiles to create matches.
        </li>
        <li>
          Creating Matches: Matches can be formed horizontally or vertically.
        </li>
        <li>
          Cascading Matches: New tiles fall into place, potentially creating new
          matches.
        </li>
        <li>Bonus Points: Achieve combo matches for bonus points.</li>
        <li>
          Game Over: The game ends when the time runs out or no more moves are
          available.
        </li>
        <!-- Add other rules as needed -->
      </ul>
    </section>
    <button @click="startGame">Start Game</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const startGame = () => {
      router.push({ name: "Game" });
    };

    return { startGame };
  },
};
</script>

<style>
.home {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.game-rules {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.game-rules h2 {
  color: #333;
  margin-bottom: 15px;
}

.game-rules ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.game-rules ul li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  line-height: 1.6;
}

.game-rules ul li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #007bff;
  font-size: 20px;
  line-height: 20px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
