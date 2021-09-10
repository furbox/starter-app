import { Test, TestingModule } from '@nestjs/testing';
import { ModuleResolver } from './module.resolver';
import { ModuleService } from './module.service';

describe('ModuleResolver', () => {
  let resolver: ModuleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleResolver, ModuleService],
    }).compile();

    resolver = module.get<ModuleResolver>(ModuleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
