import { Controller, Get } from '@nestjs/common';
import { Exportable } from '@workspace/generalZod';

import { AppService } from './app.service';
import { TestEntityService } from './testentity.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testEntityService: TestEntityService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('allEntities')
  async testOneEntity() {
    const imported: Exportable = new Exportable('bob');
    console.log(`${imported.content}`);
    await this.testEntityService.createTestEntity('test');
    return this.testEntityService.findAll();
  }
}
