import { Inject, Injectable } from '@nestjs/common';

import { PostedTask, Task } from '../entities/task.entity';
import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class CreateTaskUseCase {
  constructor(@Inject(TaskPortToken) private readonly taskPort: TaskPort) {}

  async execute(task: PostedTask): Promise<Task> {
    return await this.taskPort.save(task);
  }
}
