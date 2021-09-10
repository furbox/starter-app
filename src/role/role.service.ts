import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Types } from 'mongoose';
import { CreateRoleInput, PaginationInput } from './role-inputs.dto';
import { Role, RoleDocument } from './role.entity';

@Injectable()
export class RoleService {
  private logger = new Logger('RoleService');
  constructor(
    @InjectModel(Role.name) private readonly _RoleModel: Model<RoleDocument>,
  ) {}

  async initRoles() {
    try {
      const count = await this._RoleModel.estimatedDocumentCount();

      if (count > 0) return;

      const values = await Promise.all([
        new this._RoleModel({
          name: 'ADMINISTRATOR',
          description: 'Role created to manage the entire system',
        }).save(),
        new this._RoleModel({
          name: 'OPERATOR',
          description: 'Role created to operate various areas of the system',
        }).save(),
      ]);
      this.logger.verbose(
        `Roles created successfully at system startup ${JSON.stringify(
          values,
        )}`,
      );
    } catch (error) {
      this.error('Init Create Roles', {}, error);
      throw new InternalServerErrorException();
    }
  }

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    try {
      const isRole = await this._RoleModel.findOne({
        name: createRoleInput.name,
      });
      if (isRole) {
        throw new GraphQLError('This Role exist');
      } else {
        return await new this._RoleModel(createRoleInput).save();
      }
    } catch (error) {
      this.error('Create role', createRoleInput, error);
      throw new InternalServerErrorException();
    }
  }

  async get(_id: Types.ObjectId): Promise<Role> {
    try {
      const role = await this._RoleModel.findById(_id);
      if (!role) {
        throw new GraphQLError('This role does not exist');
      }
      return role;
    } catch (error) {
      this.error('Get role', _id, error);
      throw new InternalServerErrorException();
    }
  }

  async getAll(input: PaginationInput): Promise<Role[]> {
    try {
      input.limit ? input.limit : 5;
      input.page ? input.page : 0;
      const [total, roles] = await Promise.all([
        this._RoleModel.countDocuments(),
        this._RoleModel.find().skip(input.page).limit(input.limit),
      ]);
      return roles;
    } catch (error) {
      this.error('GetAll role', {}, error);
      throw new InternalServerErrorException();
    }
  }

  async update(_id: Types.ObjectId, input: CreateRoleInput): Promise<Role> {
    try {
      return await this._RoleModel.findByIdAndUpdate(_id, input, { new: true });
    } catch (error) {
      this.error('Update role', { _id, input }, error);
      throw new InternalServerErrorException();
    }
  }

  async delete(_id: Types.ObjectId) {
    try {
      return await this._RoleModel.findByIdAndRemove(_id);
    } catch (error) {
      this.error('Delete role', _id, error);
      throw new InternalServerErrorException();
    }
  }

  private error(info: string, data: any, error: any) {
    this.logger.error(`Error: ${info}, ${JSON.stringify(data)}`, error);
  }
}
