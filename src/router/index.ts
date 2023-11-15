import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/homeView/HomeView.vue";
import LoginView from "../views/loginView/LoginView.vue";
import ProfileView from "../views/profileView/ProfileView.vue";
import GameView from "../views/gameView/GameView.vue";
// import ScoreBoard from "../views/ScoreBoardView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
  // {
  //   path: "/high-scores",
  //   name: "highScores",
  //   component: ScoreBoard,
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
