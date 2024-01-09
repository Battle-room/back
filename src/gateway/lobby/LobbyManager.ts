import { Injectable } from "@nestjs/common";
import { LobbyRepository } from "src/database/repository/LobbyRepository";

@Injectable()
export class LobbyManager {
  constructor(
    private lobbyRepository: LobbyRepository,
  ) {}

  public async createLobby() {
    return await this.lobbyRepository.create();
  }
}