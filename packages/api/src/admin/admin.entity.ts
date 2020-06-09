import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Length,
  IsEmail,
  MinLength,
  ValidateIf,
  Validate,
  IsPhoneNumber,
} from 'class-validator';
import bcryptjs from 'bcryptjs';

import { BaseEntity } from '../base/base.entity';
import { IsAdminAlreadyExist } from './admin.validator';

@Entity('admins')
@ObjectType()
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id!: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  @Field(() => String)
  public first_name!: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  @Field(() => String)
  public last_name!: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  public active!: boolean;

  @Column('text')
  @IsPhoneNumber('US', { message: 'invalid format' })
  @ValidateIf(u => !u.id)
  @Validate(IsAdminAlreadyExist)
  @Field(() => String)
  public phone!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail({}, { message: 'invalid format' })
  @ValidateIf(u => !u.id)
  @Validate(IsAdminAlreadyExist)
  @Field(() => String)
  public email!: string;

  @Column('text')
  @MinLength(8, { message: '8 character minimum' })
  public password!: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    if (this.password) {
      const salt = bcryptjs.genSaltSync();
      this.password = bcryptjs.hashSync(this.password, salt);
    }
  }
}
