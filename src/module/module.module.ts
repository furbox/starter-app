import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleResolver } from './module.resolver';

@Module({
  providers: [ModuleResolver, ModuleService]
})
export class ModuleModule {}
