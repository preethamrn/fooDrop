import Api from '@/services/Api'

export default {
  getToken(params) {
    return Api().post('auth/facebook', params)
  }
}