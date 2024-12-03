import { Inject, Injectable } from '@nestjs/common';

import { Task } from '../entities/task.entity';
import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class FindAllTasksUseCase {
  constructor(@Inject(TaskPortToken) private readonly taskPort: TaskPort) {}

  async execute(): Promise<Task[]> {
    return await this.taskPort.findAll();
  }
}
