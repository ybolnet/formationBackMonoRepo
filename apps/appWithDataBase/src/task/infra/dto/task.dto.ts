import { IsOptional, IsString } from 'class-validator';

import { PostedEditedTask, PostedTask } from '../../core/entities/task.entity';

export class PostedTaskDto implements PostedTask {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class PostedEditedTaskDto implements PostedEditedTask {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
}
