import { createStore } from 'vuex'
import user from "../store/modules/user";
export default createStore({
  // state: {
  //   currentUser: null, // This will hold the logged-in user data
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    user
  }
})
