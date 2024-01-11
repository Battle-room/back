import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UserRepository } from "src/database/repository/UserRepository";


@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
  ],
})
export class PrismaModule {}