import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { seeder } from './utils/seeds/seeds';

async function bootstrap() {
  const configService = new ConfigService();

  const PORT = configService.get<number>('port') || 3000;

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await seeder();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('UAMG API')
    .setDescription('Description for the api of UAMG API')
    .setVersion('0.0.1')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT);
  });
}
bootstrap();
