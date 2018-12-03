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
/**
 * @class FacebookLogin
 * @desc Login component that uses Facebook OAuth
 */
export default {
  name: 'facebook-login',
  data() {
    return {}
  },
  methods: {
    /**
     * Login to Facebook using OAuth. Opens popup to enter Facebook login details.
     */
    async login() {
      console.log("Loading SDK")
      let self = this
      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information.....');
          (async (fbResponse) => {
            let response = await FacebookLogin.getToken({
              access_token: fbResponse.authResponse.accessToken
            });
            console.log(response.data)
            if (response.data.auth) {
              localStorage.setItem('authToken', response.data.token)
              localStorage.setItem('facebookID', response.data.facebookID)
              self.$router.push({ path: `/` })
            } else {
              alert('Error: Failed authentication')
            }
          })(response);
        } else {
          console.log('Login Unsuccessful');
        }
      })
   	}
  }
}
</script>
