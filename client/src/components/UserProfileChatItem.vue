<template>
  <div class="transactions-dish-item">
    <v-hover :close-delay='250'>
      <v-card slot-scope='{ hover }' :class='`pl-${hover ? 5 : 0}`'>
        <v-list-tile :key='name' avatar>
          <v-layout row wrap>
            <v-flex xs6 sm3>
              <span v-if='userIsBuyer'>Seller: {{ seller }}</span>
              <span v-else>Buyer: {{ buyer }}</span>
            </v-flex>
            <v-flex xs6 sm3>
              <v-btn flat outline @click='contactSeller()'>Contact</v-btn>
            </v-flex>
          </v-layout>
        </v-list-tile>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: 'user-profile-chat-item',
  data () {
    return { }
  },
  methods: {
    contactSeller () {
      this.$router.push({ path: `/chat/${this.chatId}`, params: { id: this.chatId } })
    }
  },
  props: {
    buyer: String,
    buyerId: String,
    seller: String,
    sellerId: String,
    chatId: String
  },
  computed: {
    userIsBuyer () {
      return this.buyerId === this.$store.state.userId
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
