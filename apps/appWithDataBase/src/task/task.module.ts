import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskPortToken } from './core/ports/task.port';
import { CreateTaskUseCase } from './core/services/createtask.usecase';
import { EditTaskUseCase } from './core/services/edittask.usecase';
import { FindAllTasksUseCase } from './core/services/findalltasks.usecase';
import { FindTaskUseCase } from './core/services/findtask.usecase';
import { TaskDao } from './infra/dao/task.dao';
import { TaskRepository } from './infra/ports/task.repository';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskDao])],
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
