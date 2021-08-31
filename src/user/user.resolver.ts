import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './user-inputs.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly us: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.us.createUser(createUserInput);
  }
}
