//user.ts// User.ts

import { Module } from 'vuex';

// Define state type
export interface UserState {
    currentUser: any;
}

// Define initial state
const state: UserState = {
    currentUser: null,
};

// Define mutations, actions, getters
const userModule: Module<UserState, any> = {
    namespaced: true,
    state,
    mutations: {
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
        },
    },
    actions: {
        login({ commit }, user) {
            commit('SET_CURRENT_USER', user);
        },
        logout({ commit }) {
            commit('SET_CURRENT_USER', null);
        },
    },
    getters: {
        isLoggedIn: state => !!state.currentUser,
        currentUser: state => state.currentUser,
    },
};

export default userModule;
