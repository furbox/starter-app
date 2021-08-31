import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleInput } from './role-inputs.dto';
import { Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@Resolver(() => Role)
export class RoleResolver {
  private logger = new Logger('RoleService');
  constructor(private readonly _roleService: RoleService) {}

  @Mutation(() => Role)
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    try {
      return await this._roleService.create(createRoleInput);
    } catch (error) {
      this.error('Create role', createRoleInput, error);
    }
  }

  @Query(() => [Role])
  async findAllRoles() {
    try {
      return await this._roleService.getAll();
    } catch (error) {
      this.error('GetAll role', {}, error);
    }
  }

  @Query(() => Role)
  async findOneRole(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    try {
      return await this._roleService.get(_id);
    } catch (error) {
      this.error('Get role', _id, error);
    }
  }

  @Mutation(() => Role)
  async removeRole(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    try {
      return await this._roleService.delete(_id);
    } catch (error) {
      this.error('Delete role', _id, error);
    }
  }

  @Mutation(() => Role)
  async UpdateRoleInput(
    @Args('_id', { type: () => String }) _id: Types.ObjectId,
    @Args('updateRoleInput') updateRoleInput: CreateRoleInput,
  ) {
    try {
      return await this._roleService.update(_id, updateRoleInput);
    } catch (error) {
      this.error('Update role', _id, error);
    }
  }

  private error(info: string, data: any, error: any) {
    this.logger.error(`Error: ${info}, ${JSON.stringify(data)}`, error);
  }
}
