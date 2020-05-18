import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Length } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { CompanyStageEnum } from './enums/stage.enum';

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

  @Column('simple-array', { array: true, nullable: true })
  @Field(() => [CompanyStageEnum], { nullable: true })
  public stage?: CompanyStageEnum[];
}
