import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async search(query: string) {
    const users = await this.searchUsers(query);

    return { users }
  }

  async searchUsers(query: string) {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { 
            profile: { 
              name: {
                contains: query,
                mode: 'insensitive'
              }
            }
          },
          { 
            username: { 
              contains: query, 
              mode: 'insensitive'
            }
          }
        ]
        
      },
      select: {
        id: true,
        username: true,
        profile: true
      }
    })

    return users
  }

  async searchChats(query: string) {}

  async searchGroups(query: string) {}

  async searchChannels(query: string) {}

  async searchMessages(query: string) {}
}
