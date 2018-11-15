import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: '',
    userId: '',
    defaultDietaryRestrictions: [],
    defaultPriceRange: [0, 5],
    defaultRadius: 5,
    paypalId: ''
  },
  mutations: {
    setAuthToken (state, authToken) {
      state.authToken = authToken
    },
    setUserId (state, userId) {
      state.userId = userId
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
    }
  },
  actions: {

  }
})
