<template>
  <div class="search-dish-base">
    <header-base/>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class='search-dish-card'>
          <v-form ref='form' v-model='valid' lazy-validation>
            <v-card-title><h3 class="headline mb-0">Search</h3></v-card-title>

            <v-text-field label='Name' v-model='searchDishName' class='dish-name'></v-text-field>

            <v-combobox
              v-model='searchDishDietaryRestrictions'
              :rules='dietaryRestrictionsRules'
              :items='dietaryRestrictionsList'
              label='Dietary Restrictions'
              chips
              clearable
              solo
              multiple
              dense
            >
              <template slot='selection' slot-scope='data'>
                <v-chip
                  :selected='data.selected'
                  close
                  @input='removeDietaryRestriction(data.item)'
                >
                  <strong>{{ data.item }}</strong>&nbsp;
                </v-chip>
              </template>
            </v-combobox>

            <v-combobox
              v-model='searchDishIngredients'
              :items='[]'
              label='Ingredients'
              chips
              clearable
              solo
              multiple
            >
              <template slot='selection' slot-scope='data'>
                <v-chip
                  :selected='data.selected'
                  close
                  @input='removeIngredient(data.item)'
                >
                  <strong>{{ data.item }}</strong>&nbsp;
                </v-chip>
              </template>
            </v-combobox>

            <v-layout row>
              <v-flex xs10><v-range-slider class='padded-slider' v-model='searchDishPrice' :max='100' :min='0'></v-range-slider></v-flex>
              <v-flex xs1><v-text-field label='Price' prefix='$' v-model='searchDishPrice[0]'></v-text-field></v-flex>
              <v-flex xs1><v-text-field prefix='-' v-model='searchDishPrice[1]'></v-text-field></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs10><v-slider class='padded-slider' v-model='searchDishRadius' :max='15' :min='0'></v-slider></v-flex>
              <v-flex xs2><v-text-field class='padded-input' label='Radius' suffix='mi' v-model='searchDishRadius'></v-text-field></v-flex>
            </v-layout>

            <v-card-actions>
              <v-btn flat class='clear' color='red' @click='clear'>x Clear</v-btn>
              <v-btn flat class='search' color='green' :disabled='!valid' @click='searchDish'>- Search</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
import HeaderBase from '@/components/HeaderBase'
/**
 * @class SearchDishBase
 * @desc Component for searching for dishes. Allows a user to enter search parameters which will redirect them to ListingsBase with their appropriate search results.
 * @vue-data {Boolean} valid - Validates the search details input form
 * @vue-data {String} searchDishName - Name of the dish in the search response
 * @vue-data {Number} searchDishLocationLat - Location (latitude) of the search request
 * @vue-data {Number} searchDishLocationLong - Location (longitude) of the search request
 * @vue-data {Array.<String>} searchDishIngredients - Ingredients to include in the search response
 * @vue-data {Array.<String>} searchDishDietaryRestrictions - Dietary restrictions required in the search response
 * @vue-data {Array.<Number>} searchDishPrice - Price range of the search request
 * @vue-data {Number} searchDishRadius - Radius of the search request
 * @vue-computed {String} storeUserState - Watcher function that checks for modifications to Vuex state
 */
export default {
  name: 'search-dish-base',
  components: {
    HeaderBase
  },
  data () {
    return {
      // validation
      valid: true,
      dietaryRestrictionsList: ['gluten free', 'vegan', 'vegetarian', 'lactose free', 'nut free'],
      dietaryRestrictionsRules: [(v) => { return (v && v.every((d) => { return this.dietaryRestrictionsList.includes(d); })) || 'Dietary Restrictions must be from dropdown!' }],

      // new dish details
      searchDishName: '',
      searchDishLocationLat: 0.0,
      searchDishLocationLong: 0.0,
      searchDishIngredients: [],
      searchDishDietaryRestrictions: [],
      searchDishPrice: [0, 5],
      searchDishRadius: 5
    }
  },
  methods: {
    /**
     * Send a search request to the server. Once the response is received the user is redirected to the ListingsBase page where their results are displayed
     */
    async searchDish () {
      if (this.$refs.form.validate()) {
        try {
          let response = await DishesService.searchDish({
            name: this.searchDishName,
            ingredients: this.searchDishIngredients,
            dietaryRestrictions: this.searchDishDietaryRestrictions,
            lat: this.searchDishLocationLat,
            lon: this.searchDishLocationLong,
            radius: this.searchDishRadius,
            priceLow: this.searchDishPrice[0],
            priceHigh: this.searchDishPrice[1]
          })
          if (response.data.success) {
            console.log(response.data.dishes)
            this.$router.push({ path: `/`, name: 'Listings', params: { dishesProp: response.data.dishes, searched: true }})
          } else {
            alert('Error: ' + response.data.errorMessage)
          }
        } catch (error) {
          alert('Error: ' + error)
        }
      }
    },
    /**
     * Clear the form data entered for searching
     */
    clear () {
      this.searchDishName = ''
      this.searchDishIngredients = []
      this.searchDishDietaryRestrictions = this.$store.state.defaultDietaryRestrictions
      this.searchDishPrice = this.$store.state.defaultPriceRange
      this.searchDishRadius = this.$store.state.defaultRadius
    },
    /**
     * Removes a dietary restriction from the search dish dietary restrictions list
     */
    removeDietaryRestriction (item) {
      this.searchDishDietaryRestrictions.splice(this.searchDishDietaryRestrictions.indexOf(item), 1)
      this.searchDishDietaryRestrictions = [...this.searchDishDietaryRestrictions]
    },
    /**
     * Removes an ingredient from the search dish ingredients list
     */
    removeIngredient (item) {
      this.searchDishIngredients.splice(this.searchDishIngredients.indexOf(item), 1)
      this.searchDishIngredients = [...this.searchDishIngredients]
    }
  },
  computed: {
    storeUserState () {
      return this.$store.state.userId
    }
  },
  watch: {
    storeUserState () {
      this.clear()
    }
  },
  created () {
    this.clear()
  },
  mounted () {
    if (navigator.geolocation) {
       var self = this;
       navigator.geolocation.getCurrentPosition(function (position) {
        self.searchDishLocationLat = position.coords.latitude
        self.searchDishLocationLong = position.coords.longitude
      }, function(error) {console.log(error)})
    }
  }
}
</script>

<style scoped>
.search-dish-card {
  margin-left: 1em;
  margin-right: 1em;
}

.dish-name {
  font-size: x-large;
}

.v-card__title {
  padding: 1em 2em 0 1em;
}

.padded-slider {
  margin-left: 1em;
  margin-right: 1em;
}

.padded-input {
  margin-right: 1em;
}
</style>
