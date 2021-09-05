import { InputType, Field, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  readonly fullName: string;

  @Field()
  readonly email: string;

  @Field()
  password: string;

  @Field()
  readonly role: string;
}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'] as const),
) {}
