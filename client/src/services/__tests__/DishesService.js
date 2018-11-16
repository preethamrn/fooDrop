import DishesService from "../DishesService"
import MockDishesService from "MockDishesService"
import Api from "../Api"

it("searches for dishes with parameters", async() => {
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
  // UNCOMMENT VAR Y CODE  BELOW AND ADJUST EXPECT STATEMENT REQS APPROPRIATELY 
  // var y = await MockDishesService.searchDish({
  // 		  name: "watup",
  //         ingredients: ["[asdfff, fff]"],
  //         dietaryRestrictions: ["qqqqqqqqqqqqq", "ee"],
  //         lat: 34.0653079,
  //         lon: -118.45305689999999,
  //         radius: 100,
  //         priceLow: 0, 
 
});

it("buys a dish with parameters", async() => {
  MockDishesService.buyDish.mockImplementation( (params) => 
    Promise.resolve( DishesService.buyDish( {params})))

  var z = await MockDishesService.buyDish( {
        buyer_id:"5bedebf6844c582908ec63f5",
        seller_id: "5bedebf6844c582908ec63f5",
        post_id:"5bee1b557466d3334458600f",
        quantity: 1
    })
  console.log(z)
   //expect(MockDishesService.buyDish).toHaveBeenCalledTimes(1);
})
