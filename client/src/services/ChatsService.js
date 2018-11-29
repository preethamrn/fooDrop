import Api from '@/services/Api'

export default {
  getChats (params) {
    return Api().get('chat/get_chats', {params: params})
  },
  sendChat (params) {
    return Api().post('chat/send_chat', params)
  }
}
