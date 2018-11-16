import Api from '../services/Api'

export default { 
	searchDish: jest.fn( (params) => Promise.resolve(Api().get('dish/get_dishes_by_radius', { params }))),
	newDish: jest.fn( (params) => Promise.resolve(Api().get('dish/new_dish', params))),
	buyDish: jest.fn( (params) => Promise.resolve(Api().get('dish/transaction', { params })))
};