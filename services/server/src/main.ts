import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { corsOptions } from './config/cors.config';

dotenv.config({
  path: `../.env.${process.env.NODE_ENV}`
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions)

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET}]
  })

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Messenger App')
    .setDescription('API specification')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
