import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PostedEditedTask, PostedTask } from '../entities/task.entity';
import { TaskPort, TaskPortToken } from '../ports/task.port';

@Injectable()
export class TaskService {
  constructor(@Inject(TaskPortToken) private taskPort: TaskPort) {}

  async findTask(id: number) {
    var found = await this.taskPort.findTask(id);
    if (found == null) {
      throw new NotFoundException();
    }
    return found;
  }

  async findAllTasks() {
    return await this.taskPort.findAll();
  }

  async createTask(task: PostedTask) {
    return await this.taskPort.save(task);
  }

  async editTask(id: number, edited: PostedEditedTask) {
    var found = await this.taskPort.findTask(id);
    if (found == null) {
      throw new NotFoundException();
    }
    this.taskPort.editTask(id, edited);
  }
}
