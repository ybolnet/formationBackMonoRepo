export interface Task {
  id: number;

  title: string;

  description: string;
}
export type CreatedTask = Omit<Task, 'id'>;
export type PostedTask = Omit<Task, 'id'>;
export type PostedEditedTask = Partial<PostedTask>;
