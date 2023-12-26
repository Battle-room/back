import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/PrismaModule';
import { AuthModule } from './modules/AuthModule';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule,
  AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
