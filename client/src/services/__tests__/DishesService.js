import DishesService from "../DishesService"
import MockDishesService from "MockDishesService"
import Api from "../Api"

it("fetches data from axios", async() => {
  MockDishesService.searchDish.mockImplementation( (params) => 
   	Promise.resolve( Api().get('dish/get_dishes_by_radius', {params})))

  var x = await MockDishesService.searchDish({
  		  name: "ssadf",
          ingredients: ["[asdfff, fff]"],
          dietaryRestrictions: ["qqqqqqqqqqqqq", "ee"],
          lat: 34.0653079,
          lon: -118.45305689999999,
          radius: 100,
          priceLow: 0,
          priceHigh: 100
  	});
  //UNCOMMENT VAR Y CODE  BELOW AND ADJUST EXPECT STATEMENT REQS APPROPRIATELY 
  var y = await MockDishesService.searchDish({
  		  name: "watup",
          ingredients: ["[asdfff, fff]"],
          dietaryRestrictions: ["qqqqqqqqqqqqq", "ee"],
          lat: 34.0653079,
          lon: -118.45305689999999,
          radius: 100,
          priceLow: 0,
          priceHigh: 100
  	});

  expect(MockDishesService.searchDish).toHaveBeenCalledTimes(2);
  // expect(MockDishesService.searchDish).toHaveBeenCalledWith(    // only for the first one
  // 	 {"dietaryRestrictions": ["qqqqqqqqqqqqq", "ee"], "ingredients": ["[asdfff, fff]"], "lat": 34.0653079, "lon": -118.45305689999999, "name": "ssadf", "priceHigh": 100, "priceLow": 0, "radius": 100}
  // ); 
 
});
