import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { TaskService } from './core/services/task.service';
import { PostedEditedTaskDto, PostedTaskDto } from './infra/dto/task.dto';

@Controller('todos')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get(':id')
  async findTask(@Param('id') id: number) {
    return await this.service.findTask(id);
  }

  @Get()
  async findAllTasks() {
    return await this.service.findAllTasks();
  }

  @Post()
  async createTask(@Body() taskToCreate: PostedTaskDto) {
    console.log(`task body ${taskToCreate} `);
    return this.service.createTask(taskToCreate);
  }

  @Patch(':id')
  async editTast(
    @Body() taskToEdit: PostedEditedTaskDto,
    @Param('id') id: number
  ) {
    return this.service.editTask(id, taskToEdit);
  }
}
