import { apiService } from './apiService';

export const userService = {
  async getUserById(userId: string, token: string) {
    try {
      const data = await apiService.get(`/users/${userId}`, token);
      return data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  },

  async updateUser(userId: string, userData: object, token: string) {
    try {
      const data = await apiService.patch(`/users/${userId}`, token, userData);
      return data;
    } catch (error) {
      console.error('User update failed:', error);
      throw error;
    }
  }
};
