import { Module } from '@nestjs/common';
import DatabaseConfigService from './database-config';
import JwtConfiguration from './jwt-config';
import SMTPConfiguration from './smtp-config';
import FrontendConfiguration from './frontend-config';
import RedisConfig from './redis-config';

@Module({
  providers: [
    DatabaseConfigService,
    JwtConfiguration,
    SMTPConfiguration,
    FrontendConfiguration,
    RedisConfig,
  ],
  exports: [
    DatabaseConfigService,
    JwtConfiguration,
    SMTPConfiguration,
    FrontendConfiguration,
    RedisConfig,
  ],
})
export default class ConfigurationModule {}
