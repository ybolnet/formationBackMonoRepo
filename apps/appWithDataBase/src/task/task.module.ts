import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskPortToken } from './core/ports/task.port';
import { FindTaskUseCase } from './core/services/findtask.usecase';
import { TaskService } from './core/services/task.service';
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
    TaskService,
  ],
})
export class TaskModule {}
