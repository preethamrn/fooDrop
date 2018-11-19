<template>
  <div class="dish-details">
    <v-dialog v-model='dishDetailsDialog' max-width='500px'>
      <v-btn flat outline slot='activator'>View Dish</v-btn>
      <v-card>
        <v-img v-if="url !== ''" :src='url'></v-img>
        <v-img v-else src='../assets/default_food.png'></v-img>
        <v-card-title>
          <span class='headline'>{{ name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='description' label='Description' readonly></v-text-field>
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
          <v-btn color='blue darken-1' flat @click.native='dishDetailsDialog = false; contactSeller();'>Contact Seller</v-btn>
          <v-btn color='blue darken-1' flat @click.native='dishDetailsDialog = false; purchaseDish();'>Buy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
export default {
  name: 'dish-details',
  data () {
    return {
      dishDetailsDialog: false,
      quantity: 1
    }
  },
  methods: {
    contactSeller () {
      this.$router.push({ path: `/chat/${this.chatId}`, params: { id: this.chatId } })
    },
    async purchaseDish () {
      if (this.quantity <= 0) {
        alert('Quantity must be positive')
      } else if (this.quantity > this.maxQuantity) {
        alert('Quantity must be less than maximum available dishes (' + this.maxQuantity + ')')
      } else {
        let response = await DishesService.buyDish({
          buyer_id: this.$store.state.userId,
          seller_id: this.sellerId,
          post_id: this.id,
          quantity: this.quantity
        })
        if (response.data.status === 'fail') {
          alert('Error: Failed to buy dish')
        } else {
          alert('Success!')
        }
      }
    }
  },
  computed: {
    chatId () {
      const userId = this.$store.state.userId
      let id1 = userId > this.sellerId ? this.sellerId : userId
      let id2 = userId < this.sellerId ? this.sellerId : userId
      return id1 + id2
    }
  },
  props: {
    name: String,
    description: String,
    locationLat: Number,
    locationLong: Number,
    price: Number,
    dietaryRestrictions: Array,
    ingredients: Array,
    url: String,
    maxQuantity: Number,
    sellerId: String,
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