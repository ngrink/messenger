import { Module } from '@nestjs/common';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { ChatsGateway } from './chats.gateway';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, ChatsRepository, ChatsGateway],
})
export class ChatsModule {}
