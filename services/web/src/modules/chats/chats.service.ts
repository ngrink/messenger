import { ChatsAPI } from "./chats.api";

export class ChatsService {
  static async createChat(targetUserId: number) {
    const chat = await ChatsAPI.createChat(targetUserId);

    return chat
  }

  static async getAllUserChats() {
    const chats = await ChatsAPI.getAllUserChats();

    return chats
  }

  static async getChat(chatId: number) {
    const chat = await ChatsAPI.getChat(chatId);

    return chat
  }

  static async getChatMessages(chatId: number) {
    const messages = await ChatsAPI.getChatMessages(chatId);

    return messages
  }

  static async createChatMessage(chatId: number, text: string) {
    const message = await ChatsAPI.createChatMessage(chatId, text);

    return message
  }
}