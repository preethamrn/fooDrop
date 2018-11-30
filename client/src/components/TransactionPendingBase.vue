<template>
  <div class="transaction-pending-base">
    <h1>Transaction Pending</h1>
  </div>
</template>

<script>
import DishesService from '@/services/DishesService'
export default {
  name: 'transaction-pending-base',
  data () {
    return { }
  },
  async created () {
    let params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      params[key] = value;
    })
    console.log(params)
    if (params.success === 'true') {
      let response = await DishesService.buyDish({
        buyer_id: params.userId,
        seller_id: params.sellerId,
        post_id: params.postId,
        quantity: params.quantity
      })
      if (response.data.status === 'fail') {
        alert('Error: Failed to buy dish')
      } else {
        alert('Success!')
      }
    } else {
      alert('Error: PayPal failed to validate transaction. Try again.')
    }
    window.location.href = 'http://localhost:8080'
  }
}
</script>