import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Length, ValidateIf, Validate } from 'class-validator';

import { BaseEntity } from '../../base/base.entity';
import { CompanyEntity } from '../company.entity';
import { IsNicknameAlreadyExist } from './employee.validator';
import { UserEntity } from '../../shared/user/user.entity';

@Entity('employees')
@ObjectType()
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  @ValidateIf(u => !u.id)
  @Validate(IsNicknameAlreadyExist)
  @Field(() => String)
  public nickname!: string;

  @Column('text')
  @Field(() => String)
  public device_pin!: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  public pin_is_temp!: boolean;

  @ManyToOne(() => CompanyEntity)
  @Field(() => CompanyEntity)
  public company!: CompanyEntity;

  // Only exists if admin employee that requires email account
  @ManyToOne(() => UserEntity, { nullable: true })
  @Field(() => UserEntity, { nullable: true })
  public user?: UserEntity;
}
