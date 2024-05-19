import { Injectable } from '@nestjs/common';

import { ChatsService } from '@/modules/chats/chats.service';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly chatsService: ChatsService,

  ) {}

  async search(userId: number, query: string) {
    let users = await this.searchRepository.searchUsers(query);
    let chats = await this.searchRepository.searchChats(query);
    let messages = await this.searchRepository.searchMessages(query);
    
    const userIds = new Set(await this.chatsService.getInterlocutorIdsInPersonalChats(userId))
    const chatIds = new Set(await this.chatsService.getAllUserChatIds(userId))

    users = users.filter(user => user.id !== userId && !userIds.has(user.id))
    chats = chats.filter(chat => !chatIds.has(chat.id))

    return { users, chats, messages }
  }
}
