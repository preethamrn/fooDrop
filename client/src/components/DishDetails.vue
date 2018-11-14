<template>
  <div class="dish-details">
    <v-dialog v-model='dishDetailsDialog' max-width='500px'>
      <v-btn flat outline slot='activator'>View Dish</v-btn>
      <v-card>
        <v-img :src='url'></v-img>
        <v-card-title>
          <span class='headline'>{{ name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='url' label='Description' readonly></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model='locationLat' label='LocationLat' readonly></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model='locationLong' label='LocationLong' readonly></v-text-field>
              </v-flex>

              <v-combobox v-model='dietaryRestrictions' label='Dietary Restrictions' multiple chips readonly></v-combobox>
              <v-combobox v-model='ingredients' label='Ingredients' multiple chips readonly></v-combobox>

              <v-flex xs12>
                <v-text-field v-model='price' prefix='$' label='Price' readonly></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-layout row>
                  <v-flex xs10><v-slider class='padded-slider' v-model='quantity' :max='maxQuantity' :min='0'></v-slider></v-flex>
                  <v-flex xs2><v-text-field class='padded-input' label='Quantity' v-model='quantity'></v-text-field></v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='blue darken-1' flat @click.native='dishDetailsDialog = false'>Close</v-btn>
          <v-btn color='blue darken-1' flat @click.native='dishDetailsDialog = false; purchaseDish();'>Buy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'dish-details',
  data () {
    return {
      dishDetailsDialog: false,
      dietaryRestrictions: ['nut free'],
      ingredients: ['carrots'],
      url: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350',
      locationLat: 0.0,
      locationLong: 0.0,
      maxQuantity: 5,
      quantity: 1
    }
  },
  methods: {
    purchaseDish () {
      if (this.quantity <= 0) {
        alert('Quantity must be positive')
      } else if (this.quantity > this.maxQuantity) {
        alert('Quantity must be less than maximum available dishes (' + this.maxQuantity + ')')
      } else {
        // purchase with Api
      }
    }
  },
  props: {
    name: String,
    location: String,
    price: Number,
    id: String
  }
}
</script>

<style scoped>
.v-chip .v-chip__content {
  color: #000000
}

.padded-slider {
  margin-left: 1em;
  margin-right: 1em;
}

.padded-input {
  margin-right: 1em;
}
</style>