import Api from '@/services/Api'

export default {
	getToken(params) {
		Api().post('auth/facebook', params)
	}
}