<!--LoginForm.vue-->
<template>
  <div id="login-signup-form">
    <h2>Login / Signup</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Username Field -->
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <!-- Login and Signup Buttons -->
      <div class="form-actions">
        <button type="submit" @click="setAction('login')">Login</button>
        <button type="submit" @click="setAction('signup')">Signup</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { User, UserService } from "@/models/User";
import { authService } from "@/services/authService";

export default {
  name: "LoginForm",
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const action = ref("login"); // Default action
    const userService = new UserService(); // Instance of UserService

    const setAction = (newAction: string) => {
      action.value = newAction;
    };

    const handleSubmit = async () => {
      const userData: User = {
        username: username.value,
        password: password.value,
      };

      // Validate user data
      if (!userService.validateUserData(userData)) {
        alert("Invalid user data. Please check the requirements.");
        return;
      }

      try {
        if (action.value === "login") {
          await login(userData);
        } else {
          await signup(userData);
        }
      } catch (error: any) {
        alert(error.message);
      }
    };

    const login = async (userData: User) => {
      const response = await authService.login(
        userData.username,
        userData.password
      );
      console.log("Login successful:", response);
      // Updated dispatch to include the entire user object
      store.dispatch("user/login", {
        user: { id: response.userId, username: userData.username },
        token: response.token,
      });
      router.push({ name: "Home" }); // Navigate to home page
    };

    const signup = async (userData: User) => {
      const response = await authService.createUser(userData);
      console.log("Signup successful:", response);
      // Updated dispatch to include the entire user object
      store.dispatch("user/login", {
        user: { id: response.userId, username: userData.username },
        token: response.token,
      }); // Dispatch login action after signup
      router.push({ name: "Home" }); // Navigate to home page
    };

    return { username, password, setAction, handleSubmit };
  },
};
</script>

<style>
#login-signup-form {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
  height: 400px;
  justify-content: center;
}
</style>
