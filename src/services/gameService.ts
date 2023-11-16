import { apiService } from './apiService';

export const gameService = {
  async fetchGames(token: string) {
    try {
      const games = await apiService.get('/games', token);
      // Here you would commit to your Vuex store
      return games;
    } catch (error) {
      // Handle error, possibly by committing an error state to the Vuex store
      throw error;
    }
  },

  async startNewGame(token: string) {
    try {
      const newGame = await apiService.post('/games', token);
      // Here you would commit to your Vuex store
      return newGame;
    } catch (error) {
      // Handle error
      throw error;
    }
  },

  async fetchGameById(token: string, gameId: number) {
    try {
      const game = await apiService.get(`/games/${gameId}`, token);
      // Here you would commit to your Vuex store
      return game;
    } catch (error) {
      // Handle error
      throw error;
    }
  },

  async updateGame(gameId: number, token: string, updateData: object) {
    try {
      const updatedGame = await apiService.patch(`/games/${gameId}`, token, updateData);
      // Here you would commit to your Vuex store
      return updatedGame;
    } catch (error) {
      // Handle error
      throw error;
    }
  },

  // Additional game-specific methods...
};
