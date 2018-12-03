import Api from '@/services/Api'

/**
 * @module DishesService
 * @desc Module for communicating with /dish/ endpoint on backend server
 */
export default {
  /**
   * POST request to dish/new_dish for new dish creation
   * @param {Request} params
   * @return {Promise}
   */
  newDish (params) {
    return Api().post('dish/new_dish', params)
  },
  /**
   * GET request to dish/get_dishes_by_radisu for getting new dishes
   * @param {Request} params
   * @return {Promise}
   */
  searchDish (params) {
    return Api().get('dish/get_dishes_by_radius', { params: params })
  },
  /**
   * POST request to dish/transaction for purchasing a dish
   * @param {Request} params
   * @return {Promise}
   */
  buyDish (params) {
    return Api().post('dish/transaction', params)
  }
}
