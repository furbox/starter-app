import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleInput, PaginationInput } from './role-inputs.dto';
import { Types } from 'mongoose';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly _roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    return this._roleService.create(input);
  }

  @Query(() => [Role])
  findAllRole(@Args('input') input: PaginationInput): Promise<Role[]> {
    try {
      return this._roleService.getAll(input);
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => Role)
  findOneRole(
    @Args('_id', { type: () => String }) _id: Types.ObjectId,
  ): Promise<Role> {
    return this._roleService.get(_id);
  }

  @Mutation(() => Role)
  deleteRole(
    @Args('_id', { type: () => String }) _id: Types.ObjectId,
  ): Promise<Role> {
    return this._roleService.delete(_id);
  }

  @Mutation(() => Role)
  updateRole(
    @Args('_id', { type: () => String }) _id: Types.ObjectId,
    @Args('input') input: CreateRoleInput,
  ): Promise<Role> {
    return this._roleService.update(_id, input);
  }
}
