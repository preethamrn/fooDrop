<template>
  <div class="transactions-dish-item">
    <v-hover :close-delay='250'>
      <v-card slot-scope='{ hover }' :class='`pl-${hover ? 5 : 0}`'>
        <v-list-tile :key='name' avatar>
          <v-layout row wrap>
            <v-tooltip top>
              <v-list-tile-avatar v-if="dish.imageUrl !== ''" slot='activator' tile size='50'><img :src='dish.imageUrl'></v-list-tile-avatar>
              <v-list-tile-avatar v-else slot='activator' tile size='50'><img src='../assets/default_food.png'></v-list-tile-avatar>
              <span>{{ dish.description }}</span>
            </v-tooltip>
            <v-flex xs9 sm5>
              <v-list-tile-content>
                <v-list-tile-title>{{ name }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <a target='_blank' :href="'https://www.google.com/maps/search/' + location.lat + ',' + location.lon">
                    Distance: {{ distanceInMiles }} miles (Google Maps 🡕)
                  </a>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs6 sm3>
              <span :style="[cost > 0 ? {'color': 'green'} : {'color': 'red'}]">{{ dish.quantity }} * {{ dish.price }} = {{ cost }}</span>
            </v-flex>
            <v-flex xs6 sm3>
              <dish-details
                :name='dish.name'
                :description='dish.description'
                :locationLat='dish.location.lat'
                :locationLong='dish.location.lon'
                :price='dish.price'
                :dietaryRestrictions='dish.dietaryRestrictions'
                :ingredients='dish.ingredients'
                :url='dish.imageUrl'
                :maxQuantity=0
                :sellerId='dish.sellerId'
                :sellerPaypalId='dish.sellerPaypalId'
                :id='dish._id'
              />
            </v-flex>
          </v-layout>
        </v-list-tile>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import DishDetails from '@/components/DishDetails'
/**
 * @class TransactionDishItem
 * @desc This component is nested within the UserProfileBase component. It displays a single row of details for a transaction in the transactions list.
 * @vue-data {Number} distanceInMiles - Distance of the dish from user location
 * @vue-prop {String} name - Name of the dish
 * @vue-prop {Position} location - Location of the dish in terms of { latitude, longitude }
 * @vue-prop {Dish} dish - Dish details of the transaction
 * @vue-computed {Number} cost - Cost of the transaction. Negative if the dish is bought and positive otherwise.
 */
export default {
  name: 'transactions-dish-item',
  components: {
    DishDetails
  },
  data () {
    return {
      distanceInMiles: 0.0
    }
  },
  mounted () {
    if (navigator.geolocation) {
       var self = this;
       navigator.geolocation.getCurrentPosition(function (position) {
        var lat1 = position.coords.latitude
        var lon1 = position.coords.longitude
        var lat2 = self.location.lat
        var lon2 = self.location.lon
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1) * (Math.PI/180);
        var dLon = (lon2-lon1) * (Math.PI/180);
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c * 1.6; // Distance in Miles
        self.distanceInMiles = Math.round(d*100)/100;
      })
    }
  },
  props: {
    name: String,
    location: Object,
    dish: Object
  },
  computed: {
    cost () {
      if (this.dish.buyerID === this.$store.state.userId) {
        return this.dish.price * this.dish.quantity * -1;
      } else {
        return this.dish.price * this.dish.quantity;
      }
    }
  }
}
</script>

<style>
.v-list__tile {
  height: 88px
}
@media only screen and (max-width: 1080px) {
  .v-list__tile {
    height: 125px
  }
}
</style>
