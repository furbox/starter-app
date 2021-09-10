import { CreateModuleInput } from './create-module.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModuleInput extends PartialType(CreateModuleInput) {
  @Field(() => Int)
  id: number;
}
