import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('text')
  public first_name?: string;

  @Column('text')
  public last_name?: string;

  @Column({ type: 'varchar', length: 255 })
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
