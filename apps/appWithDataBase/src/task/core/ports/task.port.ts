import { Task } from '../entities/task.entity';

export const TaskPortToken = Symbol('TaskPort');

export interface TaskPort {
  findAll(): Promise<Task[]>;
  findTask(id: number): Promise<Task | null>;
  editTask(task: Task): void;
  deleteTask(id: number): void;
  save(task: Omit<Task, 'id'>): void;
}
