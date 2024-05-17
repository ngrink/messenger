import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

import { TokensService } from '@/shared/modules/tokens';

import { ChatsService } from './chats.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { AccessTokenDto } from '@/shared/modules/auth/dto/tokens.dto';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  clients: { [id: string]: number } = {};

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokensService,
    private readonly chatsService: ChatsService
  ) {}

  afterInit() {
    instrument(this.server, {
      auth: {
        type: 'basic',
        username: 'admin',
        password: this.configService.get('SOCKETIO_UI_PASSWORD')
      }
    });
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.request.headers.authorization.split(' ')[1]
    const payload = this.tokenService.verifyAccessToken(token) as AccessTokenDto;
    const userId = payload.id

    this.clients[client.id] = userId;

    const ids = await this.chatsService.getAllUserChatIds(userId)
    client.join(ids.map(id => `chat/${id}`))
  }

  handleDisconnect(client: Socket) {
    delete this.clients[client.id];
  }

  @SubscribeMessage('chats/createChatMessage')
  async createChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateChatMessageDto,
  ) {
    const userId = this.clients[client.id]
    const { chatId, text } = payload

    const message = await this.chatsService.createChatMessage({
      userId,
      chatId,
      text
    });

    client.broadcast.to(`chat/${chatId}`).emit('chats/newMessage', message);

    return message; 
  }

  @SubscribeMessage('chats/getChatMessages')
  async getChatMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody('chatId') chatId: number
  ) {
    const messages = await this.chatsService.getChatMessages(chatId);

    return messages; 
  }
}
