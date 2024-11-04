import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestEntity {
  constructor(id: number, content: string) {
    this.id = id;
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}
