<template>
  <div name='listings-base'>
    <header-base/>
    <v-list v-if='dishes.length !== 0'>
      <listings-dish-item v-for='(dish, index) in dishes' :key='index' :name='dish.name' :location='dish.location' :price='dish.price' :id='dish.id'/>
    </v-list>
    <div v-else> No results </div>
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
  props: {
    dishesProp: {
      type: Array,
      default: () => []
    },
    searched: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDishes () {
      if (navigator.geolocation) {
        var self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          DishesService.searchDish({
            ingredients: self.$store.state.defaultIngredients,
            dietaryRestrictions: self.$store.state.defaultDietaryRestrictions,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            radius: self.$store.state.defaultRadius,
            priceLow: self.$store.state.defaultPriceRange[0],
            priceHigh: self.$store.state.defaultPriceRange[1]
          }).then((response) => {
            console.log(response)
            self.dishes = response.data.dishes
          })
        })
      }
    }
  },
  mounted () {
    if (this.searched) {
      this.dishes = this.dishesProp
    } else {
      this.getDishes()
    }
  }
}
</script>
