<template>
  <div>
    testing
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
export default {
  name: 'create-dish-base',
  data () {
    return {
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
  }
}
</script>
