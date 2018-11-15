import Api from '../services/Api'

export default {
	searchDish: jest.fn((params) => Promise.resolve(Api().get('dish/get_dishes_by_radius', { params })
)};

// 	console.log(Promise.resolve(Api().get('dish/get_dishes_by_radius', 
// 		{
//   			priceLow: 3,
//   			priceHigh: 100, 
//   			lat: 34.0653079, 
//   			lon: -118.45305689999999, 
//   			radius: 100, 
//   			ingredients: ["peanut", "chicken"]
//   	}))
// );
