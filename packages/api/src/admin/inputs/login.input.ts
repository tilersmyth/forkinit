import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AdminLoginInput {
  @Field()
  readonly email!: string;
  @Field()
  readonly password!: string;
}
