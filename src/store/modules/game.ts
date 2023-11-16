// store/modules/game.ts
import { ActionContext } from 'vuex';
import { gameService } from '../../services/gameService'; // Update the path as necessary

// Replace 'any' with the actual types of your game objects and user objects.
interface Game {
  id: number;
  // ... other properties of the game
}

interface GameState {
  games: Game[];
  currentGame: Game | null;
  error: string | null;
}

export const game = {
  namespaced: true, // This allows you to have multiple store modules coexist

  // Define the state using the GameState interface
  state: (): GameState => ({
    games: [],
    currentGame: null,
    error: null
  }),

  getters: {
    allGames: (state: GameState) => state.games,
    currentGame: (state: GameState) => state.currentGame,
    errorMessage: (state: GameState) => state.error
  },

  mutations: {
    setGames(state: GameState, games: Game[]) {
      state.games = games;
    },
    setCurrentGame(state: GameState, game: Game) {
      state.currentGame = game;
    },
    setError(state: GameState, errorMessage: string) {
      state.error = errorMessage;
    }
  },
  actions: {
    async fetchGames(context: ActionContext<GameState, any>, token: string) {
      const { commit } = context;
      try {
        const games = await gameService.fetchGames(token);
        commit('setGames', games);
      } catch (error) {
        commit('setError', (error as Error).message);
      }
    },
    // ... other actions for fetching by ID, updating game, etc.
  }
};
