<template>
  <div name='listings-base'>
    <header-base/>
    <div id='map'></div>
    <v-list v-if='dishes.length !== 0'>
      <listings-dish-item v-for='(dish, index) in dishes' :key='index' :name='dish.name' :location='dish.location' :price='dish.price' :dish='dish'/>
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
      vueGMap: null,
      dishes: [],
      lat: 0,
      lng: 0
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
    getDishes (callback) {
      if (navigator.geolocation) {
        var self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          self.lat = position.coords.latitude
          self.lng = position.coords.longitude
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
            self.initGoogleMaps()
          })
        })
      }
    },
    initGoogleMaps() {
      const localOptions = {
        zoom: 15,
        center: {lat: this.lat, lng: this.lng}
      }
      console.log("InitializeGoogle Maps")
      console.log(this.dishes)
      this.vueGMap = new google.maps.Map(document.getElementById('map'), localOptions)
      for(var i = 0; i < this.dishes.length; i++) {
        console.log(i + " " + this.dishes[i])
        var marker = new google.maps.Marker({
          position: {lat: this.dishes[i].location.lat, lng: this.dishes[i].location.lon},
          map: this.vueGMap
        })
      }
    }
  },
  computed: {
    storeUserState () {
      return this.$store.state.userId
    }
  },
  watch: {
    storeUserState () {
      this.getDishes()
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
