import { CreatedTask, Task } from '../entities/task.entity';

export const TaskPortToken = Symbol('TaskPort');

export interface TaskPort {
  findAll(): Promise<Task[]>;
  findTask(id: number): Promise<Task | null>;
  editTask(id: number, task: Partial<Task>): void;
  deleteTask(id: number): void;
  save(task: CreatedTask): Promise<Task>;
}
