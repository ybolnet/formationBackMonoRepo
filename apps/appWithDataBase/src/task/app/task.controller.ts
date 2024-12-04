import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTaskUseCase } from '../core/usecases/create-task.usecase';
import { EditTaskUseCase } from '../core/usecases/edit-task.usecase';
import { FindAllTasksUseCase } from '../core/usecases/find-all-tasks.usecase';
import { FindTaskUseCase } from '../core/usecases/find-task.usecase';
import { PostedEditedTaskDto, PostedTaskDto } from './dto/task.dto';

@ApiTags('tagTest')
@Controller('todos')
export class TaskController {
  constructor(
    private readonly findAllTaskUseCase: FindAllTasksUseCase,
    private readonly findTaskUseCase: FindTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly editTaskUseCase: EditTaskUseCase
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'find a particular task of id in parameter' })
  async findTask(@Param('id') id: number) {
    return await this.findTaskUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'find all tasks' })
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