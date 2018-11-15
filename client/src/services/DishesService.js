import Api from '../services/Api'

export default {
  newDish (params) {
    return Api().post('dish/new_dish', params)
  },
  searchDish (params) {
    return Api().get('dish/get_dishes_by_radius', { params: params })
  },
  buyDish (params) {
    return Api().post('dish/transaction', params)
  }
}
