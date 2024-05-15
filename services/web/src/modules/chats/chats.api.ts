import { $axios } from "@/config";

export class ChatsAPI {
  static async createChat(targetUserId: number) {
    const res = await $axios.post('/chats', {
      targetUserId: targetUserId,
    })

    return res.data
  }

  static async getAllUserChats() {
    const res = await $axios.get('/chats')

    return res.data
  }

  static async getChat(chatId: number) {
    const res = await $axios.get(`/chats/${chatId}`)

    return res.data
  }

  static async getChatMessages(chatId: number) {
    const res =  await $axios.get(`/chats/${chatId}/messages`)

    return res.data
  }

  static async createChatMessage(chatId: number, text: string) {
    const res =  await $axios.post(`/chats/${chatId}/messages`, {
      text: text,
    })

    return res.data
  }
}