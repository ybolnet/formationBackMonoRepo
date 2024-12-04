import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PostedEditedTask, PostedTask } from '../../core/entities/task.entity';

export class PostedTaskDto implements PostedTask {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
  @IsString()
  @ApiProperty({ description: 'title of the task' })
  title: string;
  @IsString()
  @ApiProperty({ description: 'description of the task' })
  description: string;
}

export class PostedEditedTaskDto implements PostedEditedTask {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'title of the task' })
  title?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'title of the task' })
  description?: string;
}
