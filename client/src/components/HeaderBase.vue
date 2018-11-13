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
export default {
  name: 'header-base',
  data () {
    return {}
  },
  methods: {
    async logout () {
      console.log("Loading SDK")
      let self = this
      window.fbAsyncInit = function () {
        FB.init({
          appId: '1898976426806055',
          cookie: true,
          xfbml: true,
          version: 'v3.2'
        });

        console.log("Loaded")
        FB.getLoginStatus(function (response) {
          if (response.status === 'connected') {
            FB.logout(function (response) {
              if (response.authResponse) {
                localStorage.removeItem('authToken')
                self.$router.push({ path: `/login` })
              }
            })
          }
        })
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id; js.async = true;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  },
  created () {
    // initialize global details (eg. authToken, username, etc.)
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
