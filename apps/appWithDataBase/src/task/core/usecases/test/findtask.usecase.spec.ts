import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Task } from '../../entities/task.entity';
import { TaskPort, TaskPortToken } from '../../ports/task.port';
import { FindTaskUseCase } from '../find-task.usecase';

async function createModuleWithMockedTaskPort(taskPort: TaskPort) {
  return Test.createTestingModule({
    providers: [
      {
        provide: TaskPortToken,
        useValue: taskPort,
      },
      FindTaskUseCase,
    ],
  }).compile();
}

describe('FindTaskUseCase', () => {
  let usecase: FindTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await createModuleWithMockedTaskPort(
      {} as TaskPort
    );

    usecase = module.get<FindTaskUseCase>(FindTaskUseCase);
  });

  it('useCase fails when not finding task', async () => {
    let error: HttpException | undefined;
    const module = await createModuleWithMockedTaskPort({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findTask(_id: number): Promise<Task | null> {
        return Promise.resolve(null);
      },
    } as TaskPort);

    usecase = module.get<FindTaskUseCase>(FindTaskUseCase);
    try {
      await usecase.execute(1);
    } catch (e: unknown) {
      if (e instanceof HttpException) {
        error = e;
      }
    }
    expect(error).toBeInstanceOf(NotFoundException);
  });

  it('useCase calls correct finding method', async () => {
    let idTask = 0;
    const module = await createModuleWithMockedTaskPort({
      findTask(id: number): Promise<Task | null> {
        idTask = id;
        return Promise.resolve(null);
      },
    } as TaskPort);

    usecase = module.get<FindTaskUseCase>(FindTaskUseCase);
    try {
      await usecase.execute(1);
    } catch {
      expect(idTask).toBe(1);
    }
  });
});
