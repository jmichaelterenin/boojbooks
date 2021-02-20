// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    books: [],
    curr: 0
}

const actions = {
  // asynchronous operations
}

const mutations = {
  // isolated data mutations  
  setBooks(state, payload) {
    state.books = payload.books
  },
  setCurr(state, payload) {
    state.curr = payload.curr;
  }
}

const getters = {
  // reusable data accessors
  get_book: (state) => {
    return state.books[state.curr];
  },
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store