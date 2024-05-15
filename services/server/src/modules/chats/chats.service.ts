import { Injectable } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';
import { ChatsException } from './chats.exceptions';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async createChat(userId: number, targetUserId: number) {
    const chat = await this.chatsRepository.createChat(userId, targetUserId);

    return chat
  }

  async getAllChats() {
    const chats = await this.chatsRepository.getAllChats();

    return chats;
  }

  async getAllUserChats(userId: number) {
    const chats = await this.chatsRepository.getAllUserChats(userId);

    return chats;
  }

  async getChat(chatId: number) {
    const chat = await this.chatsRepository.getChat(chatId);
    if (!chat) {
      throw ChatsException.ChatNotFound()
    }

    return chat;
  }

  async getChatMessages(chatId: number) {
    const messages = await this.chatsRepository.getChatMessages(chatId);
    if (!messages) {
      throw ChatsException.ChatNotFound()
    }

    return messages;
  }

  async createChatMessage(userId: number, chatId: number, data: CreateChatMessageDto) {
    const message = await this.chatsRepository.createChatMessage(userId, chatId, data);

    return message;
  }
}
