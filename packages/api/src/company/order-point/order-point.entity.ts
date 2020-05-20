import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValidateIf, Validate } from 'class-validator';

import { CompanyEntity } from '../company.entity';
import { BaseEntity } from '../../base/base.entity';
import { IsLabelAlreadyExist } from './order-point.validator';

@Entity('order_points')
@ObjectType()
export class OrderPointEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text')
  @ValidateIf(u => !u.id)
  @Validate(IsLabelAlreadyExist)
  @Field(() => String)
  public label!: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  public note?: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  public active!: boolean;

  @ManyToOne(
    () => CompanyEntity,
    company => company.order_points,
  )
  public company!: CompanyEntity;

  @BeforeInsert()
  trimLabelBeforeInsert() {
    this.label = this.label.trim();
  }
}
