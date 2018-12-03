<template>
  <v-app id='app'>
    <router-view/>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  data () {
    return { }
  },
  methods: {
    createGoogleMaps() {
      console.log("Create Google Maps")
      return new Promise((resolve, reject) => {
        let gmap = document.createElement('script')
        gmap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBL3QjeqDnHoBHItq5CDvnN53b6ep_F1RU'
        gmap.type = 'text/javascript'
        gmap.onload = resolve
        gmap.onerror = reject
        document.body.appendChild(gmap)
        console.log("Finished Google Maps")
      })
    }
  },
  created () {

    this.createGoogleMaps()

    window.fbAsyncInit = function () {
      FB.init({
        appId: '1898976426806055',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });
      console.log("Loaded")
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id; js.async = true;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
</script>
