// user.ts

import { Module } from 'vuex';

export interface User {
  id?: string;
  username: string;
}

export interface UserState {
  user: User | null;
  token: string | null;
}

const state: UserState = {
  user: null,
  token: null,
};

const userModule: Module<UserState, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_USER(state, user: User | null) {
      state.user = user;
    },
    SET_TOKEN(state, token: string | null) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, { user, token }) {
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    token: state => state.token,
  },
};

export default userModule;
