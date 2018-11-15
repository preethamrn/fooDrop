<template>
  <div name='listings-base'>
    <header-base/>
    <v-list>
      <listings-dish-item v-for='(dish, index) in dishes' :key='index' :name='dish.name' :location='dish.location' :price='dish.price' :id='dish.id'/>
    </v-list>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
import HeaderBase from '@/components/HeaderBase'
import ListingsDishItem from '@/components/ListingsDishItem'
export default {
  name: 'listings-base',
  components: {
    HeaderBase,
    ListingsDishItem
  },
  data () {
    return {
      dishes: []
    }
  },
  async mounted () {
    let response = await DishesService.getDishes({})
    this.dishes = response.data.dishes
  }
}
</script>
