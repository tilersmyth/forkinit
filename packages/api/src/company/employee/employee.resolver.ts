import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';

import { EmployeeEntity } from './employee.entity';
import { EmployeeService } from './employee.service';
import { CreateEmployeeInput } from './inputs/create.input';
import { Company } from '../company.decorator';
import { CompanyEntity } from '../company.entity';
import { UserLoginInput } from '../../shared/user/inputs/login.input';
import { ExpressContext } from '../../types';
import { Employee } from './employee.decorator';
import { DeviceLoginInput } from './inputs/device-login.input';

@Resolver(() => EmployeeEntity)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => EmployeeEntity, { nullable: true })
  async employee(
    @Employee() employee: EmployeeEntity,
  ): Promise<EmployeeEntity> {
    return employee;
  }

  @Mutation(() => EmployeeEntity)
  async employeeCreate(
    @Company() company: CompanyEntity,
    @Args('input') input: CreateEmployeeInput,
  ) {
    return this.employeeService.createEmployee(company, input);
  }

  @Mutation(() => EmployeeEntity)
  async employeeAdminLogin(
    @Args('input') input: UserLoginInput,
    @Context() ctx: ExpressContext,
  ) {
    return this.employeeService.adminLogin(input, ctx.req);
  }

  @Mutation(() => EmployeeEntity)
  async employeeDeviceLogin(
    @Company() company: CompanyEntity,
    @Args('input') input: DeviceLoginInput,
    @Context() ctx: ExpressContext,
  ) {
    return this.employeeService.deviceLogin(company, input, ctx.req);
  }
}
