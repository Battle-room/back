import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { LobbyRepository } from "src/database/repository/LobbyRepository";
import { UserRepository } from "src/database/repository/UserRepository";


@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    LobbyRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    LobbyRepository,
  ],
})
export class PrismaModule {}