import Api from '@/services/Api'

export default {
	getAuth (params) {
		return Api().get('login', {params:params})
		//console.log("This is in the component!");
	}
}