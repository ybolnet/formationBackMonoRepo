import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../../core/entities/task.entity';

@Entity()
export class TaskDao implements Task {
  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  @Column()
  title: string;

  @Column()
  description: string;

  @PrimaryGeneratedColumn()
  id: number;
}
