import Api from '../services/Api'

export default {
  newDish (params) {
    return Api().post('dish/new_dish', params)
  },
  searchDish (params) {
    return Api().get('dish/get_dishes_by_radius', { params: params })
  },
  async buyDish (params) {
    return Promise.resolve(Api().post('dish/transaction', params)).then((r) => console.log(r))
  }
}
