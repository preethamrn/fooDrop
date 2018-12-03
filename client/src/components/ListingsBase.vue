<template>
  <div name='listings-base'>
    <header-base/>
    <div id='map'></div>
    <v-list v-if='dishes.length !== 0'>
      <listings-dish-item 
        v-for='(dish, index) in dishes' 
        :key='index' 
        :ref="'listingsdishitem' + index" 
        :name='dish.name' 
        :location='dish.location' 
        :price='dish.price' 
        :dish='dish'
      />
    </v-list>
    <div v-else> No results </div>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
import HeaderBase from '@/components/HeaderBase'
import ListingsDishItem from '@/components/ListingsDishItem'

/**
 * @class ListingsBase
 * @desc It is located at the route /. Contains a list of all dishes to be displayed in a list of ListingsDishItem.vue See ListingsDishItem.vue for more on single dishes
 * @vue-data {Array.<Dish>} dishes - Actual list of dishes to be displayed
 * @vue-prop {Boolean} searched - Boolean indicating whether dishesProp has been set
 * @vue-prop {Array.<Dish>} dishesProp - List of dishes passed in from SearchDishBase.vue
 * @vue-computed {String} storeUserState - Watcher function that checks for modifications to Vuex state
 */
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
      lon: 0
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
    /**
     * Get current location and calls DishesService.searchDish search for dishes based on the default search parameters stored in Vuex.
     */
    getDishes () {
      DishesService.searchDish({
        ingredients: this.$store.state.defaultIngredients,
        dietaryRestrictions: this.$store.state.defaultDietaryRestrictions,
        lat: this.lat,
        lon: this.lon,
        radius: this.$store.state.defaultRadius,
        priceLow: this.$store.state.defaultPriceRange[0],
        priceHigh: this.$store.state.defaultPriceRange[1]
      }).then((response) => {
        console.log(response)
        this.dishes = response.data.dishes
        this.initGoogleMaps()
      })
    },
    /**
     * Initializes google maps for displaying the map with all the dish location markers. Also attaches event listeners for opening DishDetails.
     */
    initGoogleMaps() {
      const localOptions = {
        zoom: 17,
        center: {lat: this.lat, lng: this.lon}
      }
      console.log("InitializeGoogle Maps")
      console.log(this.dishes)
      var self = this
      this.vueGMap = new google.maps.Map(document.getElementById('map'), localOptions)
      // current position
      new google.maps.Marker({
        position: {lat: this.lat, lng: this.lon},
        map: this.vueGMap,
        icon: 'http://i.stack.imgur.com/orZ4x.png'
      })
      // position of all food items on map
      for(var i = 0; i < this.dishes.length; i++) {
        console.log(i + " " + this.dishes[i])
        /*var icon = {
          url: this.dishes[i].imageUrl,
          scaledSize: new google.maps.Size(25,25),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(25,25)
        }*/
        var marker = new google.maps.Marker({
          position: {lat: this.dishes[i].location.lat, lng: this.dishes[i].location.lon},
          map: this.vueGMap,
          //icon: icon,
          index: i
        })
        marker.addListener('click', function() {
          self.$refs['listingsdishitem' + this.index][0].openDishDetails()
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
  /**
   * Automatically called when the page is mounted. It checks if the dishes have been passed in as props from SearchDishBase.vue and calls getDishes if not.
   */
  mounted () {
    if (navigator.geolocation) {
      let self = this
      navigator.geolocation.getCurrentPosition(function (position) {
        self.lat = position.coords.latitude
        self.lon = position.coords.longitude
        if (self.searched) {
          self.dishes = self.dishesProp
          self.initGoogleMaps()
        } else {
          self.getDishes()
        }
      })
    }
  }
}
</script>
