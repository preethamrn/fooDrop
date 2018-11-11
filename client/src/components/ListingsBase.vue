<template>
  <div name='listings-base'>
    <v-list v-for='(dish, index) in dishes' :key='index'>
      <listings-dish-item :name='dish.name' :location='dish.location' :price='dish.price' :id='dish.id'/>
    </v-list>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
import ListingsDishItem from '@/components/ListingsDishItem'
export default {
  name: 'listings-base',
  components: {
    ListingsDishItem
  },
  data () {
    return {
      dishes: [],

      // new dish details
      newDishName: '',
      newDishIngredients: [],
      newDishDietaryRestrictions: [],
      newDishPrice: '',
      newDishAmount: 0
    }
  },
  methods: {
    async newDish () {
      let response = await DishesService.newDish({
        name: this.newDishName,
        ingredients: this.newDishIngredients,
        dietaryRestrictions: this.newDishDietaryRestrictions,
        price: this.newDishPrice,
        amount: this.newDishAmount
      })
      if (response.data.success) {
        alert('Success!')
      } else {
        alert('Error: ' + response.data.errorMessage)
      }
    }
  },
  async created () {
    let response = await DishesService.getDishes({})
    this.dishes = response.data.dishes
  }
}
</script>
