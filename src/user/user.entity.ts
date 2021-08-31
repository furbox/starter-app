import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { Role } from '../role/role.entity';
import { RoleTypes } from '../role/role.enum';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  fullName: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  createAt: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  updateAt: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  lastdateLogin: string;

  @Field(() => Role)
  @Prop({ type: Types.ObjectId, ref: 'roles', autopopulate: true })
  role: Role;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false })
  activationCode: boolean;

  @Field(() => String)
  @Prop()
  codeValidate: string;

  @Field(() => Number, { defaultValue: 0, nullable: true })
  @Prop()
  countlogin: number;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false })
  status: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
