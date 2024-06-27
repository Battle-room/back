import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseModule } from './database/database.module';
import AuthModule from './api/auth/auth.module';
import { CorsMiddleware } from './utils/middleware/cors.middleware';
import GatewayModule from './gateway/gateway.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';
import ConfigurationModule from './config/configuration.module';
import RedisConfig from './config/redis-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [RedisConfig],
      useFactory: async (configService: RedisConfig) => ({
        redis: {
          host: configService.host,
          port: configService.port,
        },
      }),
    }),
    DatabaseModule,
    AuthModule,
    GatewayModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
