import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTaskUseCase } from './core/services/createtask.usecase';
import { EditTaskUseCase } from './core/services/edittask.usecase';
import { FindAllTasksUseCase } from './core/services/findalltasks.usecase';
import { FindTaskUseCase } from './core/services/findtask.usecase';
import { PostedEditedTaskDto, PostedTaskDto } from './infra/dto/task.dto';

@Controller('todos')
export class TaskController {
  constructor(
    private findAllTaskUseCase: FindAllTasksUseCase,
    private findTaskUseCase: FindTaskUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private editTaskUseCase: EditTaskUseCase
  ) {}

  @Get(':id')
  async findTask(@Param('id') id: number) {
    return await this.findTaskUseCase.execute(id);
  }

  @Get()
  async findAllTasks() {
    return await this.findAllTaskUseCase.execute();
  }

  @Post()
  async createTask(@Body() taskToCreate: PostedTaskDto) {
    console.log(`task body ${taskToCreate} `);
    return this.createTaskUseCase.execute(taskToCreate);
  }

  @Patch(':id')
  async editTast(
    @Body() taskToEdit: PostedEditedTaskDto,
    @Param('id') id: number
  ) {
    return this.editTaskUseCase.execute(id, taskToEdit);
  }
}
