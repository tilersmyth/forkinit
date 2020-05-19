import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../base/base.entity';

@ObjectType()
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text')
  @Field(() => String)
  public street!: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  public street2?: string;

  @Column('text')
  @Field(() => String)
  public city!: string;

  @Column('text')
  @Field(() => String)
  public state!: string;

  @Column('text')
  @Field(() => String)
  public country!: string;

  @Column('text')
  @Field(() => String)
  public postal_code!: string;
}
