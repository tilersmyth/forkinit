import { InputType, Field } from '@nestjs/graphql';

import { UserRegisterInput } from '../../../shared/user/inputs/register.input';

@InputType()
export class CreateEmployeeInput {
  @Field()
  readonly nickname!: string;
  @Field(() => UserRegisterInput, { nullable: true })
  readonly user?: UserRegisterInput;
}
