import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskDao } from '../task/infra/dao/task.dao';
import { TaskModule } from '../task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      entities: [TaskDao],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
