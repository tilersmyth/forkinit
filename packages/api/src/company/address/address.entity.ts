import { Entity, Column, OneToOne } from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';

import { AddressEntity } from '../../shared/address/address.entity';
import { CompanyEntity } from '../company.entity';

@Entity('company_addresses')
@ObjectType()
export class CompanyAddressEntity extends AddressEntity {
  @Column('float')
  @Field(() => Float)
  public coord_lat!: number;

  @Column('float')
  @Field(() => Float)
  public coord_lng!: number;

  @OneToOne(
    () => CompanyEntity,
    company => company.address,
  )
  public company!: CompanyEntity;
}
