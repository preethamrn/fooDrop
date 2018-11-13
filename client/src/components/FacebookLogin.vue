<template>
	<v-layout align-center justify-center>
		<v-flex text-xs-center xs12 sm6>
			<v-btn color="#3b5998" class="white--text" @click.native ='login'>Sign In With Facebook</v-btn>
		</v-flex>
	</v-layout>
</template>

<script>
/* eslint-disable */
import FacebookLogin from '@/services/FacebookAuth'
export default {
  name: 'facebook-login',
  data() {
    return {}
  },
  methods: {
    async login() {
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
        FB.login(function (response) {
          if (response.authResponse) {
            console.log('Welcome! Fetching your information.....');
            (async (fbResponse) => {
              let response = await FacebookLogin.getToken({
                access_token: fbResponse.authResponse.accessToken
              });
              console.log(response);
              if (response.data.auth) {
                localStorage.setItem('authToken', response.data.token)
                self.$router.push({ path: `/` })
              } else {
                alert('Error: Failed authentication')
              }
            })(response);
          } else {
            console.log('Login Unsuccessful');
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
  }
}
</script>
