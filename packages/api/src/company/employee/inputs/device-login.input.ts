import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeviceLoginInput {
  @Field()
  readonly nickname!: string;
  @Field()
  readonly device_pin!: string;
}
