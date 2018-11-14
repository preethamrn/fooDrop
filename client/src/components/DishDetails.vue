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

              <v-combobox class='readonly-combobox' v-model='dietaryRestrictions' label='Dietary Restrictions' multiple chips readonly></v-combobox>
              <v-combobox class='readonly-combobox' v-model='ingredients' label='Ingredients' multiple chips readonly></v-combobox>

              <v-flex xs6>
                <v-text-field v-model='quantity' label='Quantity' readonly></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model='price' prefix='$' label='Price' readonly></v-text-field>
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
      url: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
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
</style>