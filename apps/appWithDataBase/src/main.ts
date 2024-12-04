/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TaskModule } from './task/app/task.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env['PORT'] ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('API formaton')
    .setDescription('API documentation for formation app')
    .setVersion('1.0')
    .addTag('tagTest')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
