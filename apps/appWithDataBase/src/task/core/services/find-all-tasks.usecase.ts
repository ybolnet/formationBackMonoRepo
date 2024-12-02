import { Inject, Injectable } from '@nestjs/common';

import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class FindAllTasksUseCase {
  constructor(@Inject(TaskPortToken) private readonly taskPort: TaskPort) {}

  async execute() {
    return await this.taskPort.findAll();
  }
}
