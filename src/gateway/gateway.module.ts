import { Module } from "@nestjs/common";
import { Gateway } from "./gateway";
import LobbyManager from "./lobby-manager/lobby-manager";
import UserManager from "./user-manager/user-manager";
import AuthModule from "src/api/auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [Gateway, LobbyManager, UserManager]
})
export default class GatewayModule {}