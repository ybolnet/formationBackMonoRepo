import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestEntity } from '../entities/TestEntity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestEntityService } from './testentity.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: parseInt('5432', 10),
      username: 'myuser',
      password: process.env['PASSWORD'],
      database: 'mydatabase',
      entities: [TestEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TestEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, TestEntityService],
})
export class AppModule {}
