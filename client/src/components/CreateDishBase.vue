<template>
  <div class="create-dish-base">
    <header-base/>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class='create-dish-card'>
          <v-img v-if="newDishUrl != ''"
            :src='newDishUrl'
            aspect-ratio='2.75'
          ></v-img>
          <v-text-field label='Image URL' v-model='newDishUrl'></v-text-field>

          <v-text-field label='Name' v-model='newDishName' class='dish-name'></v-text-field>
          <v-textarea label='Description' v-model='newDishDescription' rows='3' auto-grow></v-textarea>
          <v-layout row>
            <v-flex xs6>
              <v-text-field label='Latitude' v-model='newDishLocationLat' disabled></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label='Longitude' v-model='newDishLocationLong' disabled></v-text-field>
            </v-flex>
          </v-layout>

          <v-combobox
            v-model='newDishDietaryRestrictions'
            :items="['gluten free', 'vegan', 'vegetarian', 'lactose free', 'nut free']"
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
            v-model='newDishIngredients'
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

          <v-text-field label='Price' prefix='$' v-model='newDishPrice'></v-text-field>
          <v-text-field label='Quantity' v-model='newDishQuantity'></v-text-field>

          <v-card-actions>
            <v-btn flat color='red'>x Clear</v-btn>
            <v-btn flat color='green'>- Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
import HeaderBase from '@/components/HeaderBase'
export default {
  name: 'create-dish-base',
  components: {
    HeaderBase
  },
  data () {
    return {
      // new dish details
      newDishName: '',
      newDishDescription: '',
      newDishUrl: '',
      newDishLocationLat: 0.0,
      newDishLocationLong: 0.0,
      newDishIngredients: [],
      newDishDietaryRestrictions: [],
      newDishPrice: 0,
      newDishQuantity: 0
    }
  },
  methods: {
    async newDish () {
      let response = await DishesService.newDish({
        name: this.newDishName,
        ingredients: this.newDishIngredients,
        dietaryRestrictions: this.newDishDietaryRestrictions,
        price: this.newDishPrice,
        quantity: this.newDishQuantity
      })
      if (response.data.success) {
        alert('Success!')
      } else {
        alert('Error: ' + response.data.errorMessage)
      }
    },
    removeDietaryRestriction (item) {
      this.newDishDietaryRestrictions.splice(this.newDishDietaryRestrictions.indexOf(item), 1)
      this.newDishDietaryRestrictions = [...this.newDishDietaryRestrictions]
    },
    removeIngredient (item) {
      this.newDishIngredients.splice(this.newDishIngredients.indexOf(item), 1)
      this.newDishIngredients = [...this.newDishIngredients]
    }
  },
  mounted () {
    if (navigator.geolocation) {
       var self = this;
       navigator.geolocation.getCurrentPosition(function (position) {
        self.newDishLocationLat = position.coords.latitude
        self.newDishLocationLong = position.coords.longitude
      })
    }
  }
}
</script>

<style scoped>
.create-dish-card {
  margin-left: 1em;
  margin-right: 1em;
}

.dish-name {
  font-size: x-large;
}
</style>
