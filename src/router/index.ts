import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import HighScores from '../views/HighScores.vue'
import Game from '../views/Game.vue'
import { authService } from '@/services/authService'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/high-scores',
    name: 'HighScores',
    component: HighScores,
    meta: { requiresAuth: true }
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && authService.isAuthenticated() === false) {
      next({ name: 'Login' }); // Redirect to login page
  } else {
      next(); // Proceed to the route
  }
});
export default router
