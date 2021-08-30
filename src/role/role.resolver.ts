import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleInput } from './role-inputs.dto';
import { Logger } from '@nestjs/common';

@Resolver(() => Role)
export class RoleResolver {
  private logger = new Logger('RoleService');
  constructor(private readonly _roleService: RoleService) {}

  @Mutation(() => Role)
  async create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    try {
      return await this._roleService.create(createRoleInput);
    } catch (error) {
      this.logger.error(
        `Error to create role ${JSON.stringify(createRoleInput)}`,
        error,
      );
    }
  }
}
