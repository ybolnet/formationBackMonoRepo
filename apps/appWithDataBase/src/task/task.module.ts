import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskPortToken } from './core/ports/task.port';
import { CreateTaskUseCase } from './core/services/create-task.usecase';
import { EditTaskUseCase } from './core/services/edit-task.usecase';
import { FindAllTasksUseCase } from './core/services/find-all-tasks.usecase';
import { FindTaskUseCase } from './core/services/find-task.usecase';
import { TaskDao } from './infra/dao/task.dao';
import { TaskRepository } from './infra/ports/task.repository';
import { TaskController } from './task.controller';

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
    TypeOrmModule.forFeature([TaskDao]),
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: TaskPortToken,
      useClass: TaskRepository,
    },
    FindTaskUseCase,
    CreateTaskUseCase,
    EditTaskUseCase,
    FindAllTasksUseCase,
  ],
})
export class TaskModule {}
