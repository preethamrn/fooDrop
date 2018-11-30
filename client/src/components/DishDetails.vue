<template>
  <div class="dish-details">
    <v-dialog v-model='dishDetailsDialog' max-width='1000px'>
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
        let settings = {
          "method": "POST",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache": "no-cache",
            "X-PAYPAL-SECURITY-USERID": "foodrop-merchant_api1.foodrop.com",
            "X-PAYPAL-SECURITY-PASSWORD": "ZCT6QET5AWB8EMRB",
            "X-PAYPAL-SECURITY-SIGNATURE": "ANjVNayFQiI-hdVyaruFBuha2z6bA7DMMLICtgNrzBCHpuKPX3eGz0xa",
            "X-PAYPAL-REQUEST-DATA-FORMAT": "JSON",
            "X-PAYPAL-RESPONSE-DATA-FORMAT": "JSON",
            "X-PAYPAL-APPLICATION-ID": "APP-80W284485P519543T"
          },
          "body": JSON.stringify({
              "actionType": "PAY",
              "currencyCode": "USD",
              "receiverList": {
                "receiver": [{
                  "amount": this.quantity * this.price,
                  "email": this.sellerPaypalId
                }]
              },
              "returnUrl": "http://localhost:8080/transaction?success=true&sellerId=" + this.sellerId + "&userId=" + this.$store.state.userId + "&postId=" + this.id + "&quantity=" + this.quantity,
              "cancelUrl": "http://localhost:8080/transaction?success=false",
              "requestEnvelope": {
                "errorLanguage": "en_US",
                "detailLevel": "ReturnAll"
              }
          })
        }

        fetch('https://svcs.sandbox.paypal.com/AdaptivePayments/Pay', settings).then(function (response) {
          return response.json()
        }, function(error) {
          alert('Error: Failed to complete transaction with PayPal')
        }).then(function (json) {
          console.log(json)
          if (json.responseEnvelope.ack === 'Success') {
            window.open("https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=" + json.payKey)
          }
        })
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
    sellerPaypalId: String,
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