import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;
}
