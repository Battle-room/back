import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class RedisConfig {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('redis.host');
  }

  get port(): number {
    return this.configService.get<number>('redis.port');
  }
}
