import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModuleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
