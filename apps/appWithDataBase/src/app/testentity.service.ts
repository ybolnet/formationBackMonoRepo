import { Repository } from 'typeorm';

// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TestEntity } from '../entities/TestEntity';

@Injectable()
export class TestEntityService {
  constructor(
    @InjectRepository(TestEntity)
    private repository: Repository<TestEntity>
  ) {}

  async findAll(): Promise<TestEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<TestEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async createTestEntity(content: string): Promise<TestEntity> {
    const newEntity = this.repository.create({ content });
    return await this.repository.save(newEntity);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
