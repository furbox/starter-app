import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Module {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
