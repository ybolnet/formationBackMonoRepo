import { Injectable } from '@nestjs/common';

import { Task } from '../../core/entities/task.entity';
import { TaskPort } from '../../core/ports/task.port';

@Injectable()
export class TaskFakeRepository implements TaskPort {
  constructor() {}
  save(task: Omit<Task, 'id'>): void {
    console.log(`delegated save( ${task} ) to fake object`);
  }

  findAll(): Promise<Task[]> {
    console.log('delegated findAll to fake object');
    return Promise.resolve([]);
  }
  findTask(id: number): Promise<Task | null> {
    console.log(`delegated findTask (${id}) to fake object`);
    return Promise.resolve(null);
  }
  editTask(task: Task): void {
    console.log(`delegated edittask( ${task} ) to fake object`);
  }
  deleteTask(id: number): void {
    console.log(`delegated deleteTask (${id}) to fake object`);
  }
}
