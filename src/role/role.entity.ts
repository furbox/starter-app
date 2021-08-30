import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Role {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  createdAt: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Date, timestamp: true, default: Date.now() })
  updatedAt: string;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
