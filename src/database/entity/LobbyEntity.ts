import { UserLobby } from "src/database/entity/UserLobbyEntity";


export class LobbyEntity {
  constructor(
    public key: string,
  ) {}

  public users: [UserLobby]
  public lobbyMaxPlayers: number
}