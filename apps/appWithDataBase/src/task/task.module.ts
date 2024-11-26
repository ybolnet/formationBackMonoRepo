import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskPortToken } from './core/ports/task.port';
import { TaskDao } from './infra/dao/task.dao';
import { TaskRepository } from './infra/ports/task.repository';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskDao])], // Register the User entity
  controllers: [TaskController],
  providers: [
    {
      provide: TaskPortToken,
      useClass: TaskRepository,
    },
  ],
})
export class TaskModule {}
