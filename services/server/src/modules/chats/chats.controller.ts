import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AccessTokenDto } from '@/shared/modules/auth/dto/tokens.dto';
import { Authenticated, CurrentUser } from '@/shared/modules/auth';
import { StorageService } from '@/shared/modules/storage';

import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatMessageBodyDto, CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ReadMessagesBodyDto } from './dto/read-messages.dto';
import { ChatsException } from './chats.exceptions';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly storageService: StorageService
  ) {}

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

  @Get(':id/messages/all')
  @Authenticated()
  getChatMessages(
    @Param("id") chatId: number,
  ) {
    return this.chatsService.getChatMessages(chatId);
  }

  @Post(':id/messages')
  @Authenticated()
  async createChatMessage(
    @CurrentUser() user: AccessTokenDto,
    @Param("id") chatId: number,
    @Body() data: CreateChatMessageBodyDto,
  ) {
    const userId = user.id;
    const { text, attachments } = data
    
    return this.chatsService.createChatMessage({userId, chatId, text, attachments});
  }

  @Post(':id/attachments')
  @Authenticated()
  @UseInterceptors(FilesInterceptor('attachments[]'))
  async createAttachments(
    @Param("id") chatId: number,
    @UploadedFiles() attachments: Array<Express.Multer.File>
  ) {
    const uploaded = await this.storageService.attachments.Upload(
      attachments.map(attachment => ({buffer: attachment.buffer})), 
      `${chatId}`
    )
    if (!uploaded) {
      throw ChatsException.FailedToUploadAttachments()
    }

    const attachmentsDB = await this.chatsService.createAttachments(
      attachments.map((attachment, i) => ({
        mimetype: attachment.mimetype,
        size: attachment.size,
        originalName: attachment.originalname,
        location: uploaded[i].Location
      })
    ))

    return attachmentsDB
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
