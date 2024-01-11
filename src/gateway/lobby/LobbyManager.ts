import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/database/repository/LobbyRepository";

@Injectable()
export class LobbyManager {
  constructor(
    private lobbyRepository: LobbyRepository,
  ) {}

  private lobbies = {}


  public async createLobby() {
    const lobby = this.lobbyRepository.create();
    this.lobbies[lobby.key] = lobby;
    return lobby;
  }
}