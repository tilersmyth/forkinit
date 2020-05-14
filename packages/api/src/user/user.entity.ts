import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import * as bcryptjs from 'bcryptjs';

@Entity('users')
@ObjectType()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id?: string;

  @Column('text')
  @Field(() => String)
  public first_name?: string;

  @Column('text')
  @Field(() => String)
  public last_name?: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  public email?: string;

  @Column('text')
  public password?: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    if (this.password) {
      const salt = bcryptjs.genSaltSync();
      this.password = bcryptjs.hashSync(this.password, salt);
    }
  }
}
