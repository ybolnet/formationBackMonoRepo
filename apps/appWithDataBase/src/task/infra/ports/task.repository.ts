import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatedTask, Task } from '../../core/entities/task.entity';
import { TaskPort } from '../../core/ports/task.port';
import { TaskDao } from '../dao/task.dao';

@Injectable()
export class TaskRepository implements TaskPort {
  constructor(
    @InjectRepository(TaskDao)
    private repo: Repository<TaskDao>
  ) {}

  save(task: CreatedTask): Promise<Task> {
    console.log(
      `delegated save(${JSON.stringify(task)} ) to typeORM aware object`
    );
    var newTask = this.repo.create(task);
    console.log(`task to be saved is ${JSON.stringify(newTask)} `);
    return this.repo.save(newTask);
  }

  findAll(): Promise<Task[]> {
    console.log('delegated findAll to typeORM aware object');
    return this.repo.find();
  }
  findTask(id: number): Promise<Task | null> {
    console.log('delegated findTask to typeORM aware object');
    return this.repo.findOne({ where: { id } });
  }

  editTask(id: number, task: Partial<Task>): void {
    console.log('delegated editTask to typeORM aware object');
    this.repo.update(id, task);
  }
  deleteTask(id: number): void {
    this.repo.delete(id);
  }
}
