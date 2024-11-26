import { Task } from '../entities/task.entity';

export interface TaskPort {
  findTask(id: number): Promise<Task | null>;
  editTask(task: Task): void;
  deleteTask(id: number): void;
}
