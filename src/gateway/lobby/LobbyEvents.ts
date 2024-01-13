import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { LobbyManager } from "./LobbyManager";


@WebSocketGateway()
export class LobbyEvents {
  @WebSocketServer()
  server: Server
  constructor(
    private lobbyManager: LobbyManager,
  ) {}

  @SubscribeMessage('createLobby')
  async createLobby(client: Socket) {
    const lobby = this.lobbyManager.createLobby();
    client.join(lobby.key);
    client.emit('goToLobby', {key: lobby.key});
  }

  @SubscribeMessage('connectToLobby')
  connectToLobby(client: Socket, key: string) {
    const lobby = this.lobbyManager.connectToLobby(key);
    if(!lobby) client.emit('error', 'Lobby is not existing');
    client.join(lobby.key);
    client.emit('goToLobby', {key: lobby.key});
  }
}