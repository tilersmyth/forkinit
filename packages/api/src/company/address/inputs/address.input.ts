import { InputType, Field, Float } from '@nestjs/graphql';

import { AddressInput } from '../../../shared/address/inputs/address.input';

@InputType()
export class CompanyAddressInput extends AddressInput {
  @Field(() => Float)
  public coord_lat!: number;

  @Field(() => Float)
  public coord_lng!: number;
}
