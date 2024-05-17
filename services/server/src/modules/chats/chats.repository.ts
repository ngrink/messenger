import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Injectable()
export class ChatsRepository { 
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createChat(userId: number, targetUserId: number) {
    const chat = await this.prisma.chat.create({
      data: {
        type: 'PERSONAL',
        members: {
          createMany: {
            data: [
              { userId: userId, role: 'OWNER'},
              { userId: targetUserId, role: 'OWNER' }
            ]
          }  
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                profile: true
              }
            }
          }
        }
      }
    })

    return chat;
  }

  // async createGroupChat(userId: number, name: string) {
  //   const chat = await this.prisma.chat.create({
  //     data: {
  //       type: 'GROUP',
  //       name: name,
  //       members: {
  //         create: { userId: userId, role: 'OWNER'},  
  //       },
  //     },
  //     include: {
  //       members: {
  //         include: {
  //           user: {
  //             select: {
  //               profile: true
  //             }
  //           }
  //         }
  //       }
  //     }
  //   })

  //   return chat;
  // }

  // async createChannelChat(userId: number, name: string) {
  //   const chat = await this.prisma.chat.create({
  //     data: {
  //       type: 'CHANNEL',
  //       name: name,
  //       members: {
  //         create: { userId: userId, role: 'OWNER'},  
  //       },
  //     },
  //     include: {
  //       members: {
  //         include: {
  //           user: {
  //             select: {
  //               profile: true
  //             }
  //           }
  //         }
  //       }
  //     }
  //   })

  //   return chat;
  // }

  async getAllChats() {
    const chats = await this.prisma.chat.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                profile: true
              }
            }
          }
        },
      },
    })

    return chats;
  }

  async getAllUserChats(userId: number) {
    const chats = await this.prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId: userId
          }
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                profile: true
              }
            }
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
    })

    chats.map(chat => {
      let message = chat.messages[0]
      chat["lastMessage"] = message;
      delete chat.messages
    })

    return chats;
  }

  async getAllUserChatIds(userId: number) {
    const ids = []
    
    const chats = await this.prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId: userId
          }
        },
      },
      select: {
        id: true
      }
    })

    chats.forEach(chat => {
      ids.push(chat.id)
    })

    return ids;
  }

  async getChat(chatId: number) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                profile: true
              }
            }
          }
        },
      }
    })
    if (!chat) {
      return null
    }

    return chat
  }

  async createChatMessage(data: CreateChatMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        userId: data.userId,
        chatId: data.chatId,
        text: data.text,
      },
      include: {
        attachments: true,
        author: {
          select: {
            profile: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        }
      }
    })

    return message;
  }

  async getChatMessages(chatId: number) {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId: chatId
      },
      include: {
        attachments: true,
        author: {
          select: {
            profile: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        }
      }
    })
    if (!messages) {
      return null
    }

    return messages;
  }
}