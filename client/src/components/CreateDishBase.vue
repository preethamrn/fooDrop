<template>
  <div class="create-dish-base">
    <header-base/>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class='create-dish-card'>
          <v-form ref='form' v-model='valid' lazy-validation>
            <v-img v-if="newDishUrl != ''"
              :src='newDishUrl'
              aspect-ratio='2.75'
            ></v-img>
            <v-text-field label='Image URL' v-model='newDishUrl'></v-text-field>

            <v-text-field label='Name' v-model='newDishName' :rules='nameRules' class='dish-name'></v-text-field>
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

            <v-text-field label='Price' prefix='$' :rules='priceRules' v-model.number='newDishPrice'></v-text-field>
            <v-text-field label='Quantity' :rules='quantityRules' v-model.number='newDishQuantity'></v-text-field>

            <v-card-actions>
              <v-btn flat color='red' @click='clearForm'>x Clear</v-btn>
              <v-btn flat color='green' :disabled='!valid' @click='createDish'>- Post</v-btn>
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
export default {
  name: 'create-dish-base',
  components: {
    HeaderBase
  },
  data () {
    return {
      // validation
      valid: true,
      nameRules: [(v) => { return !!v || 'Name is required' }],
      dietaryRestrictionsList: ['gluten free', 'vegan', 'vegetarian', 'lactose free', 'nut free'],
      dietaryRestrictionsRules: [(v) => { return (v && v.every((d) => { return this.dietaryRestrictionsList.includes(d); })) || 'Dietary Restrictions must be from dropdown!' }],
      priceRules: [
        (v) => { return !!v || 'Price is required'}, 
        (v) => { return (v && v > 0 && v <= 100) || 'Price must be between $0 and $100' }, 
        (v) => { return (v && (100*v - Math.floor(100*v) === 0)) || 'Price cannot have more than two decimal places' }
      ],
      quantityRules: [(v) => { return !!v || 'Quantity is required'}, (v) => { return (v && v > 0) || 'Quantity cannot be negative' }],

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
    async createDish () {
      // TODO: also include seller userId and paypalId in dish details
      if (this.$refs.form.validate()) {
        if (this.$store.state.paypalId !== '') {
          let response = await DishesService.newDish({
            name: this.newDishName,
            description: this.newDishDescription,
            imageUrl: this.newDishUrl,
            dietaryRestrictions: this.newDishDietaryRestrictions,
            ingredients: this.newDishIngredients,
            location: {lat: this.newDishLocationLat, lon: this.newDishLocationLong},
            price: this.newDishPrice,
            sellerId: this.$store.state.userId,
            sellerPaypalId: this.$store.state.paypalId,
            quantity: this.newDishQuantity
          })
          if (response.data.success) {
            alert('Success!')
          } else {
            alert('Error: ' + response.data.errorMessage)
          }
        } else {
          alert('You must enter your paypal email in your user profile to buy this dish')
        }
      }
    },
    clearForm () {
      this.newDishName = ''
      this.newDishDescription = ''
      this.newDishUrl = ''
      this.newDishIngredients = []
      this.newDishDietaryRestrictions = []
      this.newDishPrice = null
      this.newDishQuantity = null
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
