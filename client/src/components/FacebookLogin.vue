<template>
	<v-layout align-center justify-center>
		<v-flex text-xs-center xs12 sm6>
			<v-btn color="#3b5998" class="white--text" @click.native ='login'>Sign In With Facebook</v-btn>
		</v-flex>
	</v-layout>
</template>

<script>
import LoginService from '@/services/LoginService'
export default {
  name: 'facebook-login',
  data () {
    return {}
  },
  methods: {
    async login () {
      let response = await LoginService.getAuth({})
      console.log(response)
    }
  }
}
</script>
