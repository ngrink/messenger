import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';

import { AccessTokenDto } from '@/shared/modules/auth/dto/tokens.dto';
import { Authenticated, CurrentUser } from '@/shared/modules/auth';

import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatMessageBodyDto, CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ReadMessagesBodyDto } from './dto/read-messages.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @Authenticated()
  createChat(
    @CurrentUser() user: AccessTokenDto,
    @Body() data: CreateChatDto
  ) {
    return this.chatsService.createChat(user.id, data.targetUserId);
  }

  @Get()
  @Authenticated()
  getAllUserChats(
    @CurrentUser() user: AccessTokenDto,
  ) {
    return this.chatsService.getAllUserChats(user.id);
  }

  @Get(':id')
  @Authenticated()
  getChat(
    @Param("id") chatId: number
  ) {
    return this.chatsService.getChat(chatId);
  }

  @Get(':id/messages')
  @Authenticated()
  getChatMessages(
    @Param("id") chatId: number
  ) {
    return this.chatsService.getChatMessages(chatId);
  }

  @Post(':id/messages')
  @Authenticated()
  createChatMessage(
    @CurrentUser() user: AccessTokenDto,
    @Param("id") chatId: number,
    @Body() data: CreateChatMessageBodyDto,
  ) {
    const userId = user.id;
    const text = data.text

    return this.chatsService.createChatMessage({userId, chatId, text});
  }

  @Post(':id/messages/read')
  @Authenticated()
  @HttpCode(200)
  async readMessages(
    @CurrentUser() user: AccessTokenDto,
    @Param("id") chatId: number,
    @Body() data: ReadMessagesBodyDto,
  ) {
    const userId = user.id;

    await this.chatsService.readMessages(chatId, userId, data.messageIds);

    return "OK"
  }

  @Post(':id/messages/readall')
  @Authenticated()
  @HttpCode(200)
  async readAllMessages(
    @CurrentUser() user: AccessTokenDto,
    @Param("id") chatId: number,
  ) {
    const userId = user.id;

    await this.chatsService.readAllMessages(chatId, userId);

    return "OK"
  }
}
