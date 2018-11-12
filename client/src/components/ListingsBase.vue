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
      dishes: []
    }
  },
  async created () {
    let response = await DishesService.getDishes({})
    this.dishes = response.data.dishes
  }
}
</script>
