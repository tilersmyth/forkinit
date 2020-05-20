import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Length } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { CompanyAddressEntity } from './address/address.entity';
import { OrderPointEntity } from './order-point/order-point.entity';

@Entity('companies')
@ObjectType()
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text')
  @Length(3, 100, { message: 'must be between 3 and 100 characters' })
  @Field(() => String)
  public name!: string;

  @Column('boolean', { default: false })
  @Field(() => Boolean)
  public active!: boolean;

  @Column('boolean', { default: false })
  @Field(() => Boolean)
  public setup!: boolean;

  @OneToOne(
    () => CompanyAddressEntity,
    address => address.company,
    { nullable: true },
  )
  @JoinColumn()
  public address?: CompanyAddressEntity;

  @OneToMany(
    () => OrderPointEntity,
    order_point => order_point.company,
    { nullable: true },
  )
  @Field(() => [OrderPointEntity])
  public order_points?: OrderPointEntity[];
}
