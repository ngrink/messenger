import { Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [ChatsModule],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository],
})
export class SearchModule {}
