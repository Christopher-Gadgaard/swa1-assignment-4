// store/index.ts
import { createStore } from 'vuex'

import user from "../store/modules/user";

import { game } from '@/store/modules/game' 


export default createStore({
  modules: {
    game, 
    user
  }
})
