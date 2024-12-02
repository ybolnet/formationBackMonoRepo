import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTaskUseCase } from './core/services/create-task.usecase';
import { EditTaskUseCase } from './core/services/edit-task.usecase';
import { FindAllTasksUseCase } from './core/services/find-all-tasks.usecase';
import { FindTaskUseCase } from './core/services/find-task.usecase';
import { PostedEditedTaskDto, PostedTaskDto } from './infra/dto/task.dto';

@Controller('todos')
export class TaskController {
  constructor(
    private readonly findAllTaskUseCase: FindAllTasksUseCase,
    private readonly findTaskUseCase: FindTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly editTaskUseCase: EditTaskUseCase
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
    console.log(`task body ${JSON.stringify(taskToCreate)} `);
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
