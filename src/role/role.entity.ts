import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class Role {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  description: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  createdAt: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  updatedAt: string;
}

export type RoleDocument = Role & mongoose.Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
