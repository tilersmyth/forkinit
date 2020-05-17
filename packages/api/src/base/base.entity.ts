import { BaseEntity as TypeOrmBaseEntity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DateTime } from 'luxon';

import { DateScalar } from './date.scalar';

@ObjectType()
export class BaseEntity extends TypeOrmBaseEntity {
  public id?: string;

  @Column('timestamptz')
  @Field(() => DateScalar)
  public created_at?: DateTime;

  @Column('timestamptz')
  @Field(() => DateScalar)
  public updated_at?: DateTime;
}
