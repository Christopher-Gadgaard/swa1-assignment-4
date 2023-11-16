import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import HighScores from '../views/HighScores.vue'
import Game from '../views/Game.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/high-scores',
    name: 'HighScores',
    component: HighScores
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
