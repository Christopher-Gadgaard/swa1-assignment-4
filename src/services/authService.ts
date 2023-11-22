import { apiService } from './apiService';

export const authService = {
  async login(username: string, password: string) {
    try {
      // Use the post method from apiService to send login request
      const data = await apiService.post('/login', '', { username, password });
      // Save token and user details to localStorage or another secure place
      localStorage.setItem('authToken', data.token);
      // You might want to store additional user details
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
        // Use the post method with the logout endpoint
       const response= await apiService.post('/logout', token);
       console.log('Logout response:', response);
        localStorage.removeItem('authToken');
        // Handle additional cleanup if necessary
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
  async createUser(userData: { username: string; password: string; /* other user data */ }) {
    try {
      // The userData object should contain all the necessary fields required by your API
      const data = await apiService.post('/users', '', userData);
      // Handle the response, such as storing the new user's token, if applicable
      return data;
    } catch (error) {
      console.error('User creation failed:', error);
      throw error;
    }
  },

  async updateUser(userId: string, userData: { /* user data fields to update */ }, token: string) {
    try {
      // The userData object should contain all the fields that you want to update
      const data = await apiService.patch(`/users/${userId}`, token, userData);
      // Handle the response, such as updating the local user details
      return data;
    } catch (error) {
      console.error('User update failed:', error);
      throw error;
    }
  }
  
};
