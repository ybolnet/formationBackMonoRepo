import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class FindTaskUseCase {
  constructor(@Inject(TaskPortToken) private readonly taskPort: TaskPort) {}

  async execute(id: number) {
    const found = await this.taskPort.findTask(id);
    if (found === null) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }
}
