// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestEntity } from '../entities/TestEntity';
import { TestEntityService } from './testentity.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])], // Register the User entity
  providers: [TestEntityService],
  controllers: [],
})
export class UserModule {}
