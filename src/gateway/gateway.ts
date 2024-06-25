import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import LobbyManager from './lobby-manager/lobby-manager';
import UserManager from './user-manager/user-manager';
import AuthService from 'src/api/auth/auth.service';
import { SocketEvent } from 'src/utils/enums/socket-event.enum';
import { CreateLobbyDTO } from './lobby/dto/create-lobby.dto';
import { UsePipes } from '@nestjs/common';
import { SocketValidationPipe } from './pipe/socket-validation.pipe';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly lobbyManager: LobbyManager,
    private readonly userManager: UserManager,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const user = await this.authService.verifyToken(token);
      this.userManager.addUser({ id: user.sub, socketId: client.id });
      console.log('Client connected: ' + client.id);
    } catch (error) {
      client.disconnect(true);
      console.log('Invalid token. Client disconnected: ' + client.id);
    }
  }

  handleDisconnect(client: Socket) {
    this.userManager.removeUser(client.id);
  }

  @UsePipes(SocketValidationPipe())
  @SubscribeMessage(SocketEvent.CREATE_LOBBY)
  createLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() lobbyData: CreateLobbyDTO,
  ) {
    try {
      const creator = this.userManager.getUserBySocketId(client.id);
      const lobby = this.lobbyManager.createLobby(creator, lobbyData);
      client.emit(SocketEvent.LOBBY_CREATED, { lobby });
    } catch (error) {
      client.emit(SocketEvent.ERROR, { message: 'User already in lobby' });
    }
  }
}
