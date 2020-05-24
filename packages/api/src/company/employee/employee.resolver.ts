import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';

import { EmployeeEntity } from './employee.entity';
import { EmployeeService } from './employee.service';
import { CreateEmployeeInput } from './inputs/create.input';
import { Company } from '../company.decorator';
import { CompanyEntity } from '../company.entity';
import { UserLoginInput } from '../../shared/user/inputs/login.input';
import { ExpressContext } from '../../types';
import { EmployeeSession } from './employee.decorator';
import { DeviceLoginInput } from './inputs/device-login.input';
import { EmployeeSessionDto } from './dto/session.dto';

@Resolver(() => EmployeeEntity)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => EmployeeSessionDto, { nullable: true })
  async employee(
    @EmployeeSession() session: EmployeeSessionDto,
  ): Promise<EmployeeSessionDto> {
    return session;
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
  async employeeStaffLogin(
    @Company() company: CompanyEntity,
    @Args('input') input: DeviceLoginInput,
  ) {
    return this.employeeService.staffLogin(company, input);
  }
}
