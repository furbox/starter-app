import { InputType, Field, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateRoleInput extends PartialType(
  OmitType(CreateRoleInput, ['description'] as const),
) {}
