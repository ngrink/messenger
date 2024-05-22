import { $axios } from "@/config";
import { Chat } from "./chats.types";

export class ChatsAPI {
  static async createChat(targetUserId: number) {
    const res = await $axios.post<Chat>('/chats', {
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

  static async readMessages(chatId: number, messageIds: number[]) {
    await $axios.post(`/chats/${chatId}/messages/read`, {
      messageIds
    })
  }

  static async readAllMessages(chatId: number) {
    await $axios.post(`/chats/${chatId}/messages/readall`)
  }
}