import { apiService } from './apiService';

export const gameService = {
  async fetchGames(token: string) {
    try {
      const games = await apiService.get('/games', token);
      return games;
    } catch (error) {
      throw error;
    }
  },

  async startNewGame(token: string) {
    try {
      const newGame = await apiService.post('/games', token);
      return newGame;
    } catch (error) {
      // Handle error
      throw error;
    }
  },

  async fetchGameById(token: string, gameId: number) {
    try {
      const game = await apiService.get(`/games/${gameId}`, token);
      return game;
    } catch (error) {
      // Handle error
      throw error;
    }
  },

  async updateGame(gameId: number, token: string, updateData: object) {
    try {
      console.log("updateGame", gameId, token, updateData);
      const updatedGame = await apiService.patch(`/games/${gameId}`, token, updateData);
      return updatedGame;
    } catch (error) {
      // Handle error
      throw error;
    }
  },

};
