import { Module } from "@nestjs/common";
import { Gateway } from "src/gateway/Gateway";
import { LobbyModule } from "./LobbyModule";
import { PrismaModule } from "./PrismaModule";


@Module({
  providers: [Gateway],
  imports: [LobbyModule, PrismaModule]
})
export class GatewayModule {}