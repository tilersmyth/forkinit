import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  IsEmail,
  Length,
  MinLength,
  ValidateIf,
  Validate,
} from 'class-validator';
import bcryptjs from 'bcryptjs';

import { BaseEntity } from '../../base/base.entity';
import { IsUserAlreadyExist } from './user.validator';
import { UserContextEnum } from './enums/context.enum';

@Entity('users')
@ObjectType()
export class UserEntity extends BaseEntity {
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

  @Column({ type: 'varchar', length: 255 })
  @IsEmail({}, { message: 'invalid format' })
  @ValidateIf(u => !u.id)
  @Validate(IsUserAlreadyExist)
  @Field(() => String)
  public email!: string;

  @Column('text')
  @MinLength(8, { message: '8 character minimum' })
  public password!: string;

  @Column({
    type: 'enum',
    enum: UserContextEnum,
  })
  @Field(() => UserContextEnum)
  public context!: UserContextEnum;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    if (this.password) {
      const salt = bcryptjs.genSaltSync();
      this.password = bcryptjs.hashSync(this.password, salt);
    }
  }
}
