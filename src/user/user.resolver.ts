import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './user-inputs.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly us: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.us.createUser(createUserInput);
  }
}
