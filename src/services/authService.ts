import { apiService } from './apiService';

export const authService = {
  async login(username: string, password: string) {
    try {
      const data = await apiService.post('/login', '', { username, password });
      localStorage.setItem('authToken', data.token);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
       const response= await apiService.post('/logout', token);
       console.log('Logout response:', response);
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
  async createUser(userData: { username: string; password: string;}) {
    try {
      const data = await apiService.post('/users', '', userData);
      return data;
    } catch (error) {
      console.error('User creation failed:', error);
      throw error;
    }
  },
  
};
