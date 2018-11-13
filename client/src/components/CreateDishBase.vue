<template>
  <div class="create-dish-base">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img v-if="newDishUrl != ''"
            :src='newDishUrl'
            aspect-ratio='2.75'
          ></v-img>
          <v-text-field label='URL' v-model='newDishUrl'></v-text-field>

          <v-text-field label='Name' v-model='newDishName' class='dish-name'></v-text-field>
          <v-textarea label='Description' v-model='newDishDescription' rows='3' auto-grow></v-textarea>

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
            readonly
            flat
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
            <v-flex xs11>
              <v-text-field label='Ingredient' v-model='newIngredient' @keydown.enter='addIngredient' class='new-ingredient'></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn flat icon color="indigo" @click='addIngredient'>
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

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
export default {
  name: 'create-dish-base',
  data () {
    return {
      // new dish details
      newDishName: '',
      newDishDescription: '',
      newDishUrl: '',
      newDishIngredients: [],
      newDishDietaryRestrictions: [],
      newDishPrice: 0,
      newDishQuantity: 0,

      // new ingredient to be appended to `newDishIngredients`
      newIngredient: ''
    }
  },
  methods: {
    async newDish () {
      let response = await DishesService.newDish({
        name: this.newDishName,
        ingredients: this.newDishIngredients,
        dietaryRestrictions: this.newDishDietaryRestrictions,
        price: this.newDishPrice,
        Quantity: this.newDishQuantity
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
    },
    addIngredient () {
      if (this.newIngredient !== '') this.newDishIngredients.push(this.newIngredient)
      this.newIngredient = ''
    }
  }
}
</script>

<style scoped>
.dish-name {
  font-size: x-large;
}

.new-ingredient {
  padding-top: 0;
  margin-top: 0;
}
</style>
