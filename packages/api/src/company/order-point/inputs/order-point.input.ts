import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderPointInput {
  @Field()
  public label!: string;

  @Field({ nullable: true })
  public note?: string;
}
