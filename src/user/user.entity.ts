import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Role } from '../role/role.entity';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: string;

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
  createdAt: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  updatedAt: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  lastdateLogin: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  @Field(() => Role)
  role: Role | string;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false })
  activationCode: boolean;

  @Field(() => String)
  @Prop({ default: '' })
  codeValidate: string;

  @Field(() => Number)
  @Prop({ default: 0 })
  countlogin: number;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false })
  status: boolean;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
