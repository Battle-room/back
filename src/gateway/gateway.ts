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
import { JoinLobbyDTO } from './lobby/dto/join-lobby.dto';
import { SocketErrorMessage } from 'src/utils/enums/socket-error-messages.enum';

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
      client.join(lobby.id);
      client.emit(SocketEvent.LOBBY_CREATED, { lobby });
    } catch (error) {
      client.emit(SocketEvent.ERROR, { message: 'User already in lobby' });
    }
  }

  @UsePipes(SocketValidationPipe())
  @SubscribeMessage(SocketEvent.JOIN_LOBBY)
  joinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() { lobbyId, password }: JoinLobbyDTO,
  ) {
    const lobby = this.lobbyManager.getLobbyById(lobbyId);
    if (!lobby) {
      client.emit(SocketEvent.ERROR, {
        message: SocketErrorMessage.LOBBY_DOESNT_EXIST,
      });
      return;
    }
    if (lobby.comparePassword(password)) {
      client.emit(SocketEvent.ERROR, {
        message: SocketErrorMessage.INVALID_LOBBY_PARAMS,
      });
      return;
    }
    client.join(lobby.id);
    const user = this.userManager.getUserBySocketId(client.id);
    lobby.addUser(user);
    client.emit(SocketEvent.JOINED_LOBBY, lobby);
  }

  @UsePipes(SocketValidationPipe())
  @SubscribeMessage(SocketEvent.LEAVE_LOBBY)
  leaveLobby(@ConnectedSocket() client: Socket) {
    const user = this.userManager.getUserBySocketId(client.id);
    const lobby = this.lobbyManager.getLobbyByUserSocketId(client.id);
    lobby.removeUser(user);
    client.emit(SocketEvent.LEFT_LOBBY);
  }

  @SubscribeMessage(SocketEvent.GET_LOBBY_LIST)
  getLobbyList(@ConnectedSocket() client: Socket) {
    const lobbies = this.lobbyManager.lobbies;
    client.emit(SocketEvent.RECEIVE_LOBBY_LIST, lobbies);
  }
}
