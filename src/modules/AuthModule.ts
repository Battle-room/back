import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserRepository } from "src/database/repository/UserRepository";
import { JwtGuard } from "src/security/JwtGuard";
import { JwtStrategy } from "src/security/JwtStrategy";
import { LocalAuthGuard } from "src/security/LocalAuthGuard";
import { LocalStrategy } from "src/security/LocalStrategy";
import { AuthService } from "src/services/AuthService";
import { PrismaModule } from "./PrismaModule";
import { AuthController } from "src/controllers/AuthController";
import { PassportModule } from "@nestjs/passport";


@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    LocalStrategy, 
    LocalAuthGuard, 
    JwtStrategy, 
    JwtGuard
  ],
  imports: [ JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '86400s' },
  }), 
  PrismaModule,
  PassportModule],
  exports: [AuthService]
})
export class AuthModule {}