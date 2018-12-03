<template>
  <div class="chat-base">
    <header-base/>
    <div style='padding-left: 1vw; padding-right: 1vw'>
      <!--<v-list three-line>
        <v-list-tile v-for='(chat, index) in chats' :key='index'>
          <v-list-content>
            <v-list-tile-title> {{ chat.username }} </v-list-tile-title>
            <v-list-tile-sub-title class='text--primary'> {{ chat.message }} </v-list-tile-sub-title>
          </v-list-content>
        </v-list-tile>
      </v-list>-->
      <v-card v-for='(chat, index) in chats' :key='index'>
        <v-card-title><strong> {{ chat.username }} </strong></v-card-title>
        <v-card-text> {{ chat.message }} </v-card-text>
      </v-card>
      <div style="width: 100%">
        <v-textarea class='chatbox' v-model='message' placeholder='Send a message' @keydown.enter='sendChat' :disabled='socket === null'></v-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBase from '@/components/HeaderBase'
import ChatsService from '@/services/ChatsService'
import io from 'socket.io-client'
export default {
  name: 'chat-base',
  components: {
      HeaderBase
  },
  data () {
    return {
      chatId: '',
      message: '',
      chats: [],
      buyer: '',
      seller: '',
      socket: null
    }
  },
  methods: {
    chatSocketConnect () {
      this.socket = io.connect('http://localhost:8081/', {
        query: {
          userId: this.$store.state.userId,
          chatId: this.chatId
        }
      })

      this.socket.on('chat', (data) => {
        this.chats.push(data)
      })
      this.socket.on('initFail', (data) => {
        alert('Error - Could not connect due to: ' + data.errorMessage)
        this.$router.push({ path: `/` })
      })
    },
    async sendChat () {
      let response = await ChatsService.sendChat({ 
        chatId: this.chatId,
        userId: this.$store.state.userId,
        username: this.$store.state.username,
        message: this.message
      })
      if (response.data.success) {
        this.message = ''
      }
    }
  },
  async created () {
    this.chatId = this.$route.params.id
    let response = await ChatsService.getChats({ chatId: this.chatId })
    if (response.data.success) {
      this.chats = response.data.result.messages
      this.buyer = response.data.result.buyer
      this.seller = response.data.result.seller
    } else {
      alert('Error - Could not get previous messages in this conversation')
      this.$router.push({ path: `/` })
    }

    if (this.$store.state.userId !== '') {
      this.chatSocketConnect()
    }
  },
  computed: {
    storeUserState () {
      return this.$store.state.userId
    }
  },
  watch: {
    storeUserState () {
      this.chatSocketConnect()
    }
  },
  destroyed () {
    this.socket.disconnect()
  }
}
</script>

<style scoped>
.v-card__text {
  padding-top: 0px
}
.v-card__title {
  padding-bottom: 0px
}
</style>