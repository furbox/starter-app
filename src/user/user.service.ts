import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './user-inputs.dto';
import { User, UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';

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
        throw new ConflictException('User already exists');
      } else {
        createUserInput.password = await bcrypt.hash(
          createUserInput.password,
          10,
        );
        const user = new this.UserModel(createUserInput);
        await user.save();
        return await this.get(user._id);
      }
    } catch (error) {
      this._error('Create user', createUserInput, error);
      throw new InternalServerErrorException();
    }
  }

  async get(_id: Types.ObjectId) {
    try {
      const user = await this.UserModel.findOne({
        _id,
        status: false,
      }).populate({
        path: 'role',
      });
      return user;
    } catch (error) {
      this._error('Get user', _id, error);
      throw new InternalServerErrorException();
    }
  }

  private _error(info: string, data: any, error: any) {
    this.logger.error(`Error: ${info}, ${JSON.stringify(data)}`, error);
  }
}
