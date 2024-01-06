import { Server } from "socket.io";
import { LobbyRepository } from "src/database/repository/LobbyRepository";


export class LobbyManager {
  public server: Server;
  private lobbyRepository: LobbyRepository;

  public async createLobby() {
    await this.lobbyRepository.create();
  }
}