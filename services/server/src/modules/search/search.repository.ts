import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';

@Injectable()
export class SearchRepository { 
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async searchUsers(query: string) {
    let users = await this.prisma.user.findMany({
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
        ],
      },
      select: {
        id: true,
        username: true,
        profile: true
      }
    })

    return users
  }

  async searchChats(query: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        public: true,
        OR: [
          { 
            name: { 
              contains: query, 
              mode: 'insensitive'
            }
          },
          {
            link: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ],
      },
      select: {
        id: true,
        name: true,
        link: true
      }
    })

    return chats
  }

  async searchMessages(query: string) {
    return []
  }
}