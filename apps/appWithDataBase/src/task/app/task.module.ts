import * as https from 'https';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskPortToken } from '../core/ports/task.port';
import { WeatherValidatorPortToken } from '../core/ports/weather-validator.port';
import { WeatherPortToken } from '../core/ports/weather.port';
import { CreateTaskUseCase } from '../core/usecases/create-task.usecase';
import { EditTaskUseCase } from '../core/usecases/edit-task.usecase';
import { FindAllTasksUseCase } from '../core/usecases/find-all-tasks.usecase';
import { FindTaskUseCase } from '../core/usecases/find-task.usecase';
import { GetWeatherUseCase } from '../core/usecases/get-weather.usecase';
import { TaskDao } from '../infra/dao/task.dao';
import { TaskRepository } from '../infra/repository/task.repository';
import { WeatherService } from '../infra/repository/weather.service';
import { WeatherValidator } from '../infra/repository/weather.validator';
import { TaskController } from './task.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: parseInt('5432', 10),
      username: 'myuser',
      password: process.env['PASSWORD'],
      database: 'mydatabase',
      entities: [TaskDao],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TaskDao]),
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Disable SSL validation
      }),
    }),
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: TaskPortToken,
      useClass: TaskRepository,
    },
    {
      provide: WeatherPortToken,
      useClass: WeatherService,
    },
    {
      provide: WeatherValidatorPortToken,
      useClass: WeatherValidator,
    },
    FindTaskUseCase,
    CreateTaskUseCase,
    EditTaskUseCase,
    FindAllTasksUseCase,
    GetWeatherUseCase,
  ],
})
export class TaskModule {}
