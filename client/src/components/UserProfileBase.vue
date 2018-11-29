<template>
 <div class="user-profile-base">
   <header-base/>
   <v-layout column>
      <v-flex xs12 sm6>
        <v-card class='user-profile-card'>
          <v-form ref='form' v-model='valid' lazy-validation>
            <v-card-title><h3 class="headline mb-0">User Profile</h3></v-card-title>
            
            <v-combobox
              v-model='defaultDietaryRestrictions'
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

            <v-layout row>
              <v-flex xs10><v-range-slider class='padded-slider' v-model='defaultPriceRange' :max='100' :min='0'></v-range-slider></v-flex>
              <v-flex xs1><v-text-field label='Price' prefix='$' v-model='defaultPriceRange[0]'></v-text-field></v-flex>
              <v-flex xs1><v-text-field prefix='-' v-model='defaultPriceRange[1]'></v-text-field></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs10><v-slider class='padded-slider' v-model='defaultRadius' :max='15' :min='0'></v-slider></v-flex>
              <v-flex xs2><v-text-field class='padded-input' label='Radius' suffix='mi' v-model='defaultRadius'></v-text-field></v-flex>
            </v-layout>

            <v-card-actions>
              <v-btn flat color='green' :disabled='!valid' @click='update'>Update Defaults</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card class='user-profile-card'>
          <v-card-title><h3 class="headline mb-0">Transactions</h3></v-card-title>
          <v-list v-if='transactions.length !== 0'>
            <transactions-dish-item v-for='(dish, index) in transactions' :key='index' :name='dish.name' :location='dish.location' :dish='dish'/>
          </v-list>
        </v-card>
        <v-card class='user-profile-card'>
          <v-card-title><h3 class="headline mb-0">Chats</h3></v-card-title>
          <v-list v-if='chats.length !== 0'>
            <user-profile-chat-item v-for='(chat, index) in chats'
              :key='index'
              :buyer='chat.buyer'
              :seller='chat.seller'
              :buyerId='chat.buyerId'
              :sellerId='chat.sellerId'
              :chatId='chat.chatId'
            />
          </v-list>
        </v-card>
      </v-flex>
   </v-layout>
 </div>
</template>

<script>
import HeaderBase from '@/components/HeaderBase'
import FacebookAuth from '@/services/FacebookAuth'
import TransactionsDishItem from '@/components/TransactionsDishItem'
import UserProfileChatItem from '@/components/UserProfileChatItem'
export default {
  name: 'user-profile-base',
  components: {
    HeaderBase,
    TransactionsDishItem,
    UserProfileChatItem
  },
  data () {
    return {
      // validation
      valid: true,
      dietaryRestrictionsList: ['gluten free', 'vegan', 'vegetarian', 'lactose free', 'nut free'],
      dietaryRestrictionsRules: [(v) => { return (v && v.every((d) => { return this.dietaryRestrictionsList.includes(d); })) || 'Dietary Restrictions must be from dropdown!' }],

      // default search values
      defaultDietaryRestrictions: [],
      defaultPriceRange: [0, 5],
      defaultRadius: 5,
      transactions: [],
      chats: []
    }
  },
  methods: {
    removeDietaryRestriction (item) {
      this.defaultDietaryRestrictions.splice(this.defaultDietaryRestrictions.indexOf(item), 1)
      this.defaultDietaryRestrictions = [...this.defaultDietaryRestrictions]
    },
    resetDefaults () {
      this.defaultDietaryRestrictions = this.$store.state.defaultDietaryRestrictions
      this.defaultPriceRange = this.$store.state.defaultPriceRange
      this.defaultRadius = this.$store.state.defaultRadius
      this.transactions = this.$store.state.transactions
      this.chats = this.$store.state.chats
    },
    async update () {
      try {
        let response = await FacebookAuth.updateUser({
          _id: this.$store.state.userId,
          values: {
            radius: this.defaultRadius,
            priceLow: this.defaultPriceRange[0],
            priceHigh: this.defaultPriceRange[1],
            restrictions: this.defaultDietaryRestrictions,
          }
        })
        let user = response.data.user
        if (user) {
          this.$store.commit('setDefaultDietaryRestrictions', user.restrictions)
          this.$store.commit('setDefaultPriceRange', [user.priceLow, user.priceHigh])
          this.$store.commit('setDefaultRadius', user.radius)
        }
      } catch (error) {
        alert("Error: Couldn't save settings")
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
      this.resetDefaults()
    }
  },
  created () {
    this.resetDefaults()
  }
}
</script>

<style scoped>
.user-profile-card {
  margin-left: 1em;
  margin-right: 1em;
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
