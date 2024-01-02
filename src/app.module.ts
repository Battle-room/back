import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/PrismaModule';
import { AuthModule } from './modules/AuthModule';
import { GatewayModule } from './modules/GatewayModule';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule,
  AuthModule,
  GatewayModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
