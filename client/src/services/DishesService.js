import Api from '@/services/Api'

export default {
  newDish (params) {
    return Api().post('dish/new_dish', params)
  },
  searchDish (params) {
    return Api().get('search_dish', { params: params })
  },
  // Buy dishes
}
