import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { CreateUserInput } from './user-inputs.dto';
import { User, UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    try {
      const isUser = await this.UserModel.findOne({
        email: createUserInput.email,
      });
      if (isUser) {
        throw new GraphQLError('User already exists');
      } else {
        createUserInput.password = await bcrypt.hash(
          createUserInput.password,
          10,
        );
        return await this.UserModel.create(createUserInput);
      }
    } catch (error) {
      this._error('Create user', createUserInput, error);
      throw new InternalServerErrorException();
    }
  }

  private _error(info: string, data: any, error: any) {
    this.logger.error(`Error: ${info}, ${JSON.stringify(data)}`, error);
  }
}
