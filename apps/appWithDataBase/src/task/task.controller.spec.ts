import { Client } from 'pg';

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

import { TaskPortToken } from './core/ports/task.port';
import { CreateTaskUseCase } from './core/services/create-task.usecase';
import { EditTaskUseCase } from './core/services/edit-task.usecase';
import { FindAllTasksUseCase } from './core/services/find-all-tasks.usecase';
import { FindTaskUseCase } from './core/services/find-task.usecase';
import { TaskDao } from './infra/dao/task.dao';
import { TaskRepository } from './infra/ports/task.repository';
import { TaskController } from './task.controller';

describe('TaskController', () => {
  let controller: TaskController;

  let postgresContainer;
  let postgresClient: Client;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new Client({
      connectionString: postgresContainer.getConnectionUri(),
    });
    await postgresClient.connect();
  }, 60000);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: postgresClient.host,
          port: postgresClient.port,
          username: postgresClient.user,
          password: postgresClient.password,
          database: postgresClient.database,
          entities: [TaskDao],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([TaskDao]),
      ],
      controllers: [TaskController],
      providers: [
        {
          provide: TaskPortToken,
          useClass: TaskRepository,
        },
        FindTaskUseCase,
        CreateTaskUseCase,
        EditTaskUseCase,
        FindAllTasksUseCase,
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
