import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { AttachmentDto } from './dto/create-attachment.dto';

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
                username: true,
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
                username: true,
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
                username: true,
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
        },
        unreadMessages: {
          where: {
            userId
          },
          select: {
            messageId: true
          }
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

  async getInterlocutorIdsInPersonalChats(userId: number) {
    const ids = []

    const chats = await this.prisma.chat.findMany({
      where: {
        type: 'PERSONAL',
        members: {
          some: {
            userId: userId
          }
        }
      },
      select: {
        members: true
      }
    })

    chats.forEach(chat => {
      const member = chat.members.filter(member => member.userId !== userId)[0]
      ids.push(member.userId)
    })

    return ids
  }

  async getChatMemberIds(chatId: number) {
    const ids = []

    const chats = await this.prisma.chat.findUnique({
      where: {
        id: chatId
      },
      select: {
        members: {
          select: {
            userId: true
          }
        }
      }
    })

    chats.members.forEach(member => {
      ids.push(member.userId)
    })

    return ids
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
                username: true,
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
      }
    })
    if (!chat) {
      return null
    }

    chat["lastMessage"] = chat.messages[0]

    return chat
  }

  async createChatMessage(data: CreateChatMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        userId: data.userId,
        chatId: data.chatId,
        text: data.text,
        attachments: {
          connect: data.attachments?.map(attachment => ({
            id: attachment.id
          }))
        }
      },
      include: {
        attachments: true,
        author: {
          select: {
            username: true,
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

    let userIds = await this.getChatMemberIds(data.chatId)
    userIds = userIds.filter(userId => userId !== data.userId)

    await this.prisma.unreadMessage.createMany({
      data: userIds.map(userId => ({
        userId: userId,
        chatId: data.chatId,
        messageId: message.id,
      }))
    })

    return message;
  }

  async createAttachments(attachments: AttachmentDto[]) {
    const attachmentsDB = await this.prisma.attachment.createManyAndReturn({
      data: attachments.map(attachment => ({
        type: attachment.mimetype.split("/")[0],
        mimetype: attachment.mimetype,
        size: attachment.size,
        originalName: attachment.originalName,
        location: attachment.location
      }))
    })

    return attachmentsDB
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
            username: true,
            profile: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    })
    if (!messages) {
      return null
    }

    return messages;
  }

  async readMessages(chatId: number, userId: number, messageIds: number[]) {
    await this.prisma.unreadMessage.deleteMany({
      where: {
        chatId,
        userId,
        messageId: {
          in: messageIds
        }
      }
    })
  }

  async readAllMessages(chatId: number, userId: number) {
    await this.prisma.unreadMessage.deleteMany({
      where: {
        chatId,
        userId,
      }
    })
  }
}