// store/index.ts
import { createStore } from 'vuex'

import user from "../store/modules/user";

import { game } from './modules/game' // import the game module

export default createStore({
  modules: {
    game, // register the game module
    user
  }
})
