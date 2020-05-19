import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
  @Field()
  readonly street!: string;
  @Field({ nullable: true })
  readonly street2?: string;
  @Field()
  readonly city!: string;
  @Field()
  readonly state!: string;
  @Field()
  readonly postal_code!: string;
  @Field()
  readonly country!: string;
}
