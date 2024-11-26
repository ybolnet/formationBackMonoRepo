import { Controller, Get, Inject, Param } from '@nestjs/common';

import { TaskPort, TaskPortToken } from './core/ports/task.port';

@Controller('task')
export class TaskController {
  constructor(@Inject(TaskPortToken) private taskPort: TaskPort) {}

  @Get('todos/:id')
  async findTask(@Param('id') id: number) {
    return await this.taskPort.findTask(id);
  }

  @Get('todos')
  async findAllTasks() {
    return await this.taskPort.findAll();
  }
}
