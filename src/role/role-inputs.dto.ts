import { InputType, Field } from '@nestjs/graphql';
import { Role } from './role.entity';

@InputType()
export class CreateRoleInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;
}

@InputType()
export class PaginationInput {
  @Field()
  readonly limit: number;

  @Field()
  readonly page: number;
}

@InputType()
export class AllRolesRead {
  @Field()
  total: number;

  @Field(() => [Role])
  roles: Role[];
}
