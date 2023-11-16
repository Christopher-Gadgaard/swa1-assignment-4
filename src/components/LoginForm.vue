<!--LoginForm.vue-->
<template>
<div id="login-signup-form">
    <h2>Login / Signup</h2>
    <form @submit.prevent="handleSubmit">
        <!-- Username Field -->
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
        </div>

        <!-- Password Field -->
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
        </div>

        <!-- Login and Signup Buttons -->
        <div class="form-actions">
            <button type="submit" @click="action = 'login'">Login</button>
            <button type="submit" @click="action = 'signup'">Signup</button>
        </div>
    </form>
</div>
</template>
<script lang="ts">
import { User, UserService } from '@/models/User';
import { authService } from '@/services/authService'; // Adjust the path as per your project structure
import { useStore } from 'vuex';
import router from '@/router'; // Adjust the import path to your router configuration

export default {
    name:"LoginForm",
    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            username: '',
            password: '',
            action: 'login', // Default action
            userService: new UserService() // Instance of UserService
        };
    },
    methods: {
        async handleSubmit() {
            const userData: User = {
                username: this.username,
                password: this.password
            };

            // Validate user data
            if (!this.userService.validateUserData(userData)) {
                alert("Invalid user data. Please check the requirements.");
                return;
            }

            try {
                if (this.action === 'login') {
                    await this.login(userData);
                } else {
                    await this.signup(userData);
                }
            } catch (error:any) {
                alert(error.message);
            }
        },
        async login(userData: User) {
            const response = await authService.login(userData.username, userData.password);
            console.log('Login successful:', response);
            this.store.dispatch('user/login', response.user); // Dispatch login action
            router.push({ name: 'Home' }); // Navigate to home page
           
        },
        async signup(userData: User) {
            const response = await authService.createUser(userData);
            console.log('Signup successful:', response);
            this.store.dispatch('user/login', response.user); // Dispatch login action after signup
            router.push({ name: 'Home' }); // Navigate to home page
    }
}
}
</script>
<style>

    #login-signup-form{
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        border-radius: 10px;
        align-items: center;
        height: 400px;
        justify-content: center;
    }

</style>