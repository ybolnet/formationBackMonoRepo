import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Task } from '../entities/task.entity';
import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class FindTaskUseCase {
  constructor(@Inject(TaskPortToken) private readonly taskPort: TaskPort) {}

  async execute(id: number): Promise<Task> {
    const found = await this.taskPort.findTask(id);
    if (found === null) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }
}
