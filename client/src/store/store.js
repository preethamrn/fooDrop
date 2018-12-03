import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: '',
    userId: '',
    username: '',
    defaultDietaryRestrictions: [],
    defaultPriceRange: [0, 5],
    defaultRadius: 5,
    paypalId: '',
    transactions: [],
    chats: []
  },
  mutations: {
    setAuthToken (state, authToken) {
      state.authToken = authToken
    },
    setUserId (state, userId) {
      state.userId = userId
    },
    setUsername (state, username) {
      state.username = username
    },
    setDefaultDietaryRestrictions (state, defaultDietaryRestrictions) {
      state.defaultDietaryRestrictions = defaultDietaryRestrictions
    },
    setDefaultPriceRange (state, defaultPriceRange) {
      state.defaultPriceRange = defaultPriceRange
    },
    setDefaultRadius (state, defaultRadius) {
      state.defaultRadius = defaultRadius
    },
    setPaypalId (state, paypalId) {
      state.paypalId = paypalId
    },
    setTransactions (state, transactions) {
      state.transactions = transactions
    },
    setChats (state, chats) {
      state.chats = chats
    }
  },
  actions: {

  }
})
