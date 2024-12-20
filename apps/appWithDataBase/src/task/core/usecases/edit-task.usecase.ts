import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PostedEditedTask } from '../entities/task.entity';
import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class EditTaskUseCase {
  constructor(@Inject(TaskPortToken) private readonly taskPort: TaskPort) {}

  async execute(id: number, edited: PostedEditedTask): Promise<void> {
    const found = await this.taskPort.findTask(id);
    if (found === null) {
      throw new NotFoundException();
    }
    this.taskPort.editTask(id, edited);
  }
}
