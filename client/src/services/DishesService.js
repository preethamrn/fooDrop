import Api from '@/services/Api'

export default {
  getDishes (params) {
    return Api().get('get_dishes', { params: params })
  },
  newDish (params) {
    return Api().post('new_dish', params)
  },
  searchDish (params) {
    return Api().get('search_dish', {params: params })
  }
}
