import { Module } from "@nestjs/common";
import { LobbyEvents } from "src/gateway/lobby/LobbyEvents";
import { LobbyManager } from "src/gateway/lobby/LobbyManager";


@Module({
  providers: [LobbyEvents, LobbyManager],
  exports: [LobbyModule]
})
export class LobbyModule {}