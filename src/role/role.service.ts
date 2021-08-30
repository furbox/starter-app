import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { CreateRoleInput } from './role-inputs.dto';
import { Role, RoleDocument } from './role.entity';

@Injectable()
export class RoleService {
  private logger = new Logger('RoleService');
  constructor(
    @InjectModel(Role.name) private readonly _RoleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    try {
      const isRole = await this._RoleModel.findOne({
        name: createRoleInput.name,
      });
      if (isRole) {
        throw new GraphQLError('This Role exist');
      } else {
        return await new this._RoleModel(createRoleInput).save();
      }
    } catch (err) {
      this.logger.error(
        `Error to create role ${JSON.stringify(createRoleInput)}`,
        err,
      );
    }
  }
}
