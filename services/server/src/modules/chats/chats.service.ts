import { Injectable } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';
import { ChatsException } from './chats.exceptions';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { AttachmentDto } from './dto/create-attachment.dto';

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

  async getAllUserChatIds(userId: number) {
    const ids = await this.chatsRepository.getAllUserChatIds(userId);

    return ids;
  }

  async getInterlocutorIdsInPersonalChats(userId: number) {
    const ids = await this.chatsRepository.getInterlocutorIdsInPersonalChats(userId);

    return ids;
  }

  async getChatMemberIds(chatId: number) {
    const ids = await this.chatsRepository.getChatMemberIds(chatId)

    return ids
  }

  async getChat(chatId: number) {
    const chat = await this.chatsRepository.getChat(chatId);
    if (!chat) {
      throw ChatsException.ChatNotFound()
    }

    return chat;
  }

  async createChatMessage(data: CreateChatMessageDto) {
    const chat = await this.chatsRepository.getChat(data.chatId)
    if (!chat) {
      throw ChatsException.ChatNotFound()
    }
    
    const message = await this.chatsRepository.createChatMessage(data);

    return message;
  }

  async createAttachments(attachments: AttachmentDto[]) {
    const attachmentsDB = await this.chatsRepository.createAttachments(attachments) 

    return attachmentsDB
  }

  async getChatMessages(chatId: number) {
    const messages = await this.chatsRepository.getChatMessages(chatId);
    if (!messages) {
      throw ChatsException.ChatNotFound()
    }

    return messages;
  }
  
  async readMessages(chatId: number, userId: number, messageIds: number[]) {
    await this.chatsRepository.readMessages(chatId, userId, messageIds)

    return
  }

  async readAllMessages(chatId: number, userId: number) {
    await this.chatsRepository.readAllMessages(chatId, userId)

    return
  }
}
