import { store, socket } from "@/config";
import { ChatsAPI } from "./chats.api";
import { Message } from "./chats.types";

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

  static async createChatMessage(chatId: number, text: string, attachments?: File[] ) {
    if (attachments && attachments.length > 0) {
      const attachments_ = await this.createAttachments(chatId, attachments)

      socket.emit('chats/createChatMessage', {chatId, text, attachments: attachments_}, (message: Message) => {
        store.chatsStore.addMessage(chatId, message);
      });
    } else {
      socket.emit('chats/createChatMessage', {chatId, text}, (message: Message) => {
        store.chatsStore.addMessage(chatId, message);
      }); 
    }
  }

  static async createAttachments(chatId: number, attachments: File[]) {
    const attachments_ = await ChatsAPI.createAttachments(chatId, attachments)

    return attachments_
  }

  static async readMessages(chatId: number, messageIds: number[]) {
    await ChatsAPI.readMessages(chatId, messageIds)
  }

  static async readAllMessages(chatId: number) {
    await ChatsAPI.readAllMessages(chatId)
  }
}

socket.on('chats/newMessage', (message: Message) => {
  store.chatsStore.addUnreadMessage(message.chatId, message);
})