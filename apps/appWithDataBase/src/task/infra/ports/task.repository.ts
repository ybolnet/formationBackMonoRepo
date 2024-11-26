import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from '../../core/entities/task.entity';
import { TaskPort } from '../../core/ports/task.port';
import { TaskDao } from '../dao/task.dao';

@Injectable()
export class TaskRepository implements TaskPort {
  constructor(
    @InjectRepository(TaskDao)
    private repo: Repository<TaskDao>
  ) {}
  save(task: Omit<Task, 'id'>): void {
    var newTask = this.repo.create(task);
    this.repo.save(newTask);
  }

  findAll(): Promise<Task[]> {
    console.log('delegated findAll to typeORM aware object');
    return this.repo.find();
  }
  findTask(id: number): Promise<Task | null> {
    console.log('delegated findTask to typeORM aware object');
    return this.repo.findOne({ where: { id } });
  }
  editTask(task: Task): void {
    console.log('delegated editTask to typeORM aware object');
    this.repo.update(task.id, task);
  }
  deleteTask(id: number): void {
    this.repo.delete(id);
  }
}
