import Api from '@/services/Api'

/**
 * @module ChatService
 * @desc Module for communicating with /chat/ endpoint on backend server
 */
export default {
  /**
   * GET request to chat/get_chats for getting list of previous chat messages for a specific chatId
   * @param {Request} params
   * @return {Promise}
   */
  getChats (params) {
    return Api().get('chat/get_chats', {params: params})
  },
  /**
   * POST request to chat/send_chat for sending a new chat message for storage on the database and to broadcast to all connected users
   * @param {Request} params
   * @return {Promise}
   */
  sendChat (params) {
    return Api().post('chat/send_chat', params)
  }
}
