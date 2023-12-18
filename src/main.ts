import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors(CORS);
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT'));
  console.log(`Server up and running on: ${await app.getUrl()}`);
}
bootstrap();
