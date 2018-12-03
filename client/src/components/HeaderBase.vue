<template>
  <div class="header-base" id="header">
    <v-layout row justify-end wrap>
      <v-layout row justify-start>
        <v-btn color='primary' dark @click='$router.push({ path: `/` })'>HOME</v-btn>
      </v-layout>
      <v-btn color='green' dark @click='$router.push({ path: `/profile` })'>PROFILE</v-btn>
      <v-btn color='green' dark @click='logout'>LOGOUT</v-btn>
      <v-btn color='red' dark @click='$router.push({ path: `/new` })'>SELL</v-btn>
      <v-btn color='blue' dark @click='$router.push({ path: `/search` })'>SEARCH</v-btn>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */
import FacebookAuth from '@/services/FacebookAuth'
/**
 * @class HeaderBase
 * @desc It is a header component for all pages on the website. Allows users to navigate between pages on the website.
 */
export default {
  name: 'header-base',
  data () {
    return {}
  },
  methods: {
    /**
     * Logout of the user profile and remove login details from browser cache
     */
    async logout () {
      console.log("Loading SDK")
      let self = this
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          FB.logout(function (response) {
            if (response.authResponse) {
              localStorage.removeItem('authToken')
              localStorage.removeItem('facebookID')
              this.$store.state.userId = ''
              self.$router.push({ path: `/login` })
            }
          })
        }
      })
    }
  },
  async created () {
    if (localStorage.getItem('authToken') === null) {
      this.$router.push({ path: `/login` })
    } else if (this.$store.state.userId === '') {
      this.$store.commit('setAuthToken', localStorage.getItem('authToken'))
      let response = await FacebookAuth.validateUser(
        { facebookID: localStorage.getItem('facebookID') },
        { 'x-auth-token': this.$store.state.authToken }
      )
      if (response.data.auth) {
        // set default values for user in Vuex store
        let user = response.data.user
        this.$store.commit('setUserId', user._id)
        this.$store.commit('setUsername', user.name)
        this.$store.commit('setDefaultDietaryRestrictions', user.restrictions)
        this.$store.commit('setDefaultPriceRange', [user.priceLow, user.priceHigh])
        this.$store.commit('setDefaultRadius', user.radius)
        this.$store.commit('setPaypalId', user.paypalID)
        this.$store.commit('setTransactions', user.transactions)
        this.$store.commit('setChats', user.chats)
      } else {
        alert('Error: Authentication failed')
      }
    }
  }
}
</script>

<style>
#header {
  background-color: #f0f0f0;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
</style>
