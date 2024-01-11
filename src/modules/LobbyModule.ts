import { Module } from "@nestjs/common";
import { LobbyRepository } from "src/database/repository/LobbyRepository";
import { LobbyEvents } from "src/gateway/lobby/LobbyEvents";
import { LobbyManager } from "src/gateway/lobby/LobbyManager";


@Module({
  providers: [LobbyEvents, LobbyManager, LobbyRepository],
  exports: [LobbyModule]
})
export class LobbyModule {}