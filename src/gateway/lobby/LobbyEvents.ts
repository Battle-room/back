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
    const lobby = await this.lobbyManager.createLobby();
    client.join(lobby.key);
    client.emit('goToLobby', {key: lobby.key});
  }
}