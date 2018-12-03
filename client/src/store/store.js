import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * @class VuexStore
 * @desc Vuex Store that stores global state of the application
 * @vue-data {String} authToken - Facebook auth token for logging into the app
 * @vue-data {String} userId - User Id for communicating with the backend
 * @vue-data {String} username - Username for chat from Facebook login
 * @vue-data {Array.<String>} defaultDietaryRestrictions - Default dietary restrictions from user profile
 * @vue-data {Array.<Number>} defaultPriceRange - Default price range for search from user profile
 * @vue-data {Number} defaultRadius - Default radius for search from user profile
 * @vue-data {String} paypalId - PayPal Email for buying and selling dishes
 * @vue-data {Array.<Dish>} transactions - List of past transactions from user profile
 * @vue-data {Array.<Chat>} chats - List of past chats from user profile
 */
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
