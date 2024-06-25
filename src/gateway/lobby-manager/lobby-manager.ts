import { BadRequestException, Injectable } from '@nestjs/common';
import Lobby from '../lobby/lobby';
import { CreateLobbyDTO } from '../lobby/dto/create-lobby.dto';
import * as uuid from 'uuid';
import User from '../user/user';

@Injectable()
export default class LobbyManager {
  lobbies: Lobby[] = [];

  constructor() {}

  getLobbyByUserSocketId(socketId: string): Lobby | undefined {
    return Array.from(this.lobbies.values()).find((lobby) =>
      lobby.users.some((u) => u.socketId === socketId),
    );
  }

  createLobby(creator: User, data: CreateLobbyDTO) {
    const checkLobby = this.getLobbyByUserSocketId(creator.socketId);
    if (checkLobby) throw new BadRequestException();
    const lobby = new Lobby(
      uuid.v4(),
      data.name,
      data.password,
      creator,
      data.packageId,
    );
    this.lobbies.push(lobby);
    return lobby;
  }
}
