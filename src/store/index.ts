// store/index.ts
import { createStore } from 'vuex'
import { game } from './modules/game' // import the game module

export default createStore({
  modules: {
    game // register the game module
  }
})
