// store/modules/game.ts
import { gameService } from '@/services/gameService';
import { ActionContext } from 'vuex';


// Replace 'any' with the actual types of your game objects and user objects.
export interface Game {
  id: number;
  score: number;
  completed: boolean;
  user: number;
}

export interface GameState {
  games: Game[];
  currentGame: Game | null;
  error: string | null;
}

export const game = {
  namespaced: true, 

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
        console.log(games);
        commit('setGames', games);
      } catch (error) {
        commit('setError', (error as Error).message);
      }
    },async startNewGame(context: ActionContext<GameState, any>, token: string) {
      const { commit } = context;
      try {
        const game = await gameService.startNewGame(token);
        commit('setCurrentGame', game);
      } catch (error) {
        commit('setError', (error as Error).message);
      }
    },
  }
};
