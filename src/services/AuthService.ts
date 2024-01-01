import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtPayload } from '../security/JwtPayload';
import { TokenDTO } from '../dtos/TokenDTO';
import { UniqueUserDTO } from '../dtos/UniqueUserDTO';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../database/repository/UserRepository';
import { InvalidEntityIdException } from '../utils/exceptions/InvalidEntityIdException';
import { CreateUserDTO } from 'src/dtos/CreateUserDTO';

@Injectable()
export class AuthService {
  constructor (
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser (username: string, password: string) {
    const user = await this.userRepository.find({
      OR: [
        { username },
        { email: username },
      ],
    });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    const isMatch = await this.checkPassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('The password is incorrect');
    }
    delete user.password;
    return user;
  }

  async login (user): Promise<TokenDTO> {
    return this.getTokens(user);
  }

  private createPayload (user: User): JwtPayload {
    return {
      sub: user.id,
      username: user.username,
      createdAt: Date.now(),
    };
  }

  private getTokens (user: User): TokenDTO {
    const payload = this.createPayload(user);

    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWTTTL || '86400s'
      }),
      accessToken: this.jwtService.sign(payload)
    };
  }

  private async checkPassword (password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async hashPassword (password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async signIn(dto: CreateUserDTO) {
    dto.password = await this.hashPassword(dto.password);
    return this.userRepository.create(dto);
  }
}