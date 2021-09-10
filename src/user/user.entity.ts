import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Role } from '../role/role.entity';
import * as bcrypt from 'bcrypt';

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

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
  @Prop()
  img: string;

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

UserSchema.index({ email: 1 });

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  //only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(user.password, salt);

  //Replace the password with the hash
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};
