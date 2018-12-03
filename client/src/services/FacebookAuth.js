import Api from '@/services/Api'

/**
 * @module FacebookAuth
 * @desc Module for communicating with /auth/ and /user/ endpoint on backend server
 */
export default {
  /**
   * POST request to auth/facebook for creating user and getting facebook authentication token
   * @param {Request} params
   * @return {Promise}
   */
  getToken(params) {
    return Api().post('auth/facebook', params)
  },
  /**
   * GET request to auth/validateUser for validating user login
   * @param {Request} params 
   * @param {Header} headers - Request header containing facebook authToken
   * @return {Promise}
   */
  validateUser(params, headers) {
    return Api().get('auth/validateUser', {params: params, headers: headers})
  },
  /**
   * PUT request to user/update to update user profile details
   * @param {Request} params
   * @return {Promise}
   */
  updateUser(params) {
    return Api().put('user/update', params)
  }
}