import { ObjectType, Field } from '@nestjs/graphql';

import { EmployeeEntity } from '../employee.entity';

@ObjectType()
export class EmployeeSessionDto {
  @Field(() => EmployeeEntity)
  readonly admin!: EmployeeEntity;

  @Field(() => EmployeeEntity, { nullable: true })
  readonly staff?: EmployeeEntity;
}
