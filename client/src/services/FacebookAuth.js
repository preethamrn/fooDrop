import Api from '../services/Api'

export default {
  getToken(params) {
    return Api().post('auth/facebook', params)
  },
  validateUser(params, headers) {
    return Api().get('auth/validateUser', {params: params, headers: headers})
  },
  updateUser(params) {
    return Api().put('user/update', params)
  }
}