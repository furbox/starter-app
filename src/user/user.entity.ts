import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

enum Roles {
  Admin = 'Admin',
  Basic = 'Basic',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Roles para admintrador crear proyectos y usuarios',
});

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
  @Prop({ type: Date, timestamp: true })
  createAt: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true })
  updateAt: string;

  @Field(() => String)
  @Prop({ type: Date, timestamp: true })
  lastdateLogin: string;

  @Field(() => Roles, { defaultValue: Roles.Admin, nullable: true })
  @Prop()
  roles?: string;

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
