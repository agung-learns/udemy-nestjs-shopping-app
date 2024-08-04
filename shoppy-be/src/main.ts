import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    rawBody: true,
    cors: true,
    bodyParser: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  const config = app.get(ConfigService);
  await app.listen(config.getOrThrow('PORT'));
}
bootstrap();