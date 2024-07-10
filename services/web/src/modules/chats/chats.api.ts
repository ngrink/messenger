import { $axios } from "@/config";
import { Attachment, Chat } from "./chats.types";

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
    const res =  await $axios.get(`/chats/${chatId}/messages/all`)

    return res.data
  }

  static async createChatMessage(chatId: number, text: string) {
    const res =  await $axios.post(`/chats/${chatId}/messages`, {
      text: text,
    })

    return res.data
  }

  static async createAttachments(chatId: number, attachments: File[]) {
    const res =  await $axios.postForm<Attachment[]>(`/chats/${chatId}/attachments`, { attachments }, { timeout: 1000 * 60 * 60 })

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