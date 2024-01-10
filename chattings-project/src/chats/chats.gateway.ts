import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { SocketAddress } from 'net';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  // 유저 연결 해제
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  // 유저 연결
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Connected : ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // username db에 적재
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // 연결된 모든 소켓들에게 보내기 위해 Broadcast
    socket.broadcast.emit('new_chat', {
      chat,
      username: socket.id,
    });
  }
}
