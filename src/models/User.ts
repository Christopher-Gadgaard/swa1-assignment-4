//User.ts

export interface User {
    id?: string; // Optional because it will be assigned by the server on user creation
    username: string;
    password: string; // Note: Only used for creating or updating a user, never stored on the client side
    // Include other properties that your application requires:
    // email?: string;
    // profilePictureUrl?: string;
    // etc.
  }
  
  export class UserService {
    // You can implement user-related logic here, such as
    // formatting user data, validating user input, etc.
  
    validateUserData(user: User): boolean {
      // Simple validation example
      if (!user.username || user.username.length < 3) {
        console.error('Username must be at least 3 characters long.');
        return false;
      }
      if (!user.password || user.password.length < 3) {
        console.error('Password must be at least 3 characters long.');
        return false;
      }
      // Add more validation as needed
      return true;
    }
  
    // Other user-related methods can go here
  }
  