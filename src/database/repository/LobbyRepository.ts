import { Injectable } from "@nestjs/common";
import { PrismaService } from "../PrismaService";
import { v4 } from 'uuid';


@Injectable()
export class LobbyRepository {
  constructor(
    private prismaService: PrismaService
  ) {}

  async create() {
    const key = v4();
    const lobby = await this.prismaService.lobby.create({data: {
      key: key
    }});
    return lobby;
  }

  async findById(lobbyId: string) {
    return await this.prismaService.lobby.findUnique({
      where: {id: lobbyId}
    });
  }
}