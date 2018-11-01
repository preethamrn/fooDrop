<template>
  <div name='listings-base'>
    <div v-for='(dish, id) in dishes' :key='id'> {{ dish }} </div>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
export default {
  name: 'listings-base',
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
