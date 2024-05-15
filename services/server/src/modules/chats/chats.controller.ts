import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AccessTokenDto } from '@/shared/modules/auth/dto/tokens.dto';
import { Authenticated, CurrentUser } from '@/shared/modules/auth';

import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

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
    @Body() data: CreateChatMessageDto,
  ) {
    const userId = user.id;

    return this.chatsService.createChatMessage(userId, chatId, data);
  }
}