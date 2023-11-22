//User.ts

export interface User {
    id?: string; 
    username: string;
    password: string; 
  }
  
  export class UserService {

    validateUserData(user: User): boolean {
      if (!user.username || user.username.length < 3) {
        console.error('Username must be at least 3 characters long.');
        return false;
      }
      if (!user.password || user.password.length < 3) {
        console.error('Password must be at least 3 characters long.');
        return false;
      }
      return true;
    }
  
  }
  