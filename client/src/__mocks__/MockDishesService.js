import Api from '../services/Api'

export default { searchDish: jest.fn( (params) => Promise.resolve(Api().get('dish/get_dishes_by_radius', { params })))};