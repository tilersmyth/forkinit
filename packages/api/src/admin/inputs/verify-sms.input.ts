import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AdminVefiySmsInput {
  @Field()
  readonly email!: string;
  @Field()
  readonly code!: string;
}
