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
export default {
    name:"LoginForm",
    data() {
        return {
            username: '',
            password: '',
            action: 'login' // Default action
        };
    },
    methods: {
        handleSubmit() {
            if (this.action === 'login') {
                this.login();
            } else {
                this.signup();
            }
        },
        login() {
            // TODO: Implement login logic
            console.log('Logging in:', this.username, this.password);
            // You would typically make an HTTP request to your server here
        },
        signup() {
            // TODO: Implement signup logic
            console.log('Signing up:', this.username, this.password);
            // Similarly, make an HTTP request to your server for signup
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