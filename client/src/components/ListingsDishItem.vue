<template>
  <div class="listings-dish-item">
    <v-hover :close-delay='250'>
      <v-card slot-scope='{ hover }' :class='`pl-${hover ? 5 : 0}`'>
        <v-list-tile :key='name' avatar>
          <v-layout row wrap>
            <v-tooltip top>
              <v-list-tile-avatar slot='activator' tile size='50'><img src='../assets/default_food.png'></v-list-tile-avatar>
              <span>{{ name }}</span>
            </v-tooltip>
            <v-flex xs9 sm5>
              <v-list-tile-content>
                <v-list-tile-title>{{ name }}</v-list-tile-title>
                <v-list-tile-sub-title>Location: {{ location }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs6 sm3>
              Price: {{ price }}
            </v-flex>
            <v-flex xs6 sm3>
              <dish-details :name='name' :location='location' :price='price' :id='id'/>
            </v-flex>
          </v-layout>
        </v-list-tile>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import DishDetails from '@/components/DishDetails'
export default {
  name: 'listings-dish-item',
  components: {
    DishDetails
  },
  data () {
    return { }
  },
  props: {
    name: String,
    location: String,
    price: Number,
    id: String
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