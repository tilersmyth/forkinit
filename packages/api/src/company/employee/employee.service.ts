import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-core';
import * as bcryptjs from 'bcryptjs';

import { CrudService } from '../../base/crud.service';
import { EmployeeEntity } from './employee.entity';
import { CreateEmployeeInput } from './inputs/create.input';
import { CompanyEntity } from '../company.entity';
import { UserService } from '../../shared/user/user.service';
import { UserTypeEnum } from '../../shared/user/enums/type.enum';
import { orderCodeGenerator } from '../../utils/pin-generator';
import { ExpressRequest } from '../../types';
import { UserLoginInput } from '../../shared/user/inputs/login.input';
import { DeviceLoginInput } from './inputs/device-login.input';

@Injectable()
export class EmployeeService extends CrudService<EmployeeEntity> {
  constructor(
    @InjectRepository(EmployeeEntity)
    protected readonly repository: Repository<EmployeeEntity>,
    private readonly userService: UserService,
  ) {
    super();
  }

  async validateSession(
    req: ExpressRequest,
  ): Promise<EmployeeEntity | undefined> {
    // Graphql Playground IntrospectionQuery DOT NOT Validate
    if (req.body && req.body.query.includes('IntrospectionQuery')) {
      return;
    }

    if (!req.session.employeeId) {
      return;
    }

    try {
      return this.repository
        .createQueryBuilder('employee')
        .where('employee.id = :id', { id: req.session.employeeId })
        .leftJoinAndSelect('employee.user', 'user')
        .getOne();
    } catch (error) {
      return;
    }
  }

  public async createEmployee(
    company: CompanyEntity,
    input: CreateEmployeeInput,
  ): Promise<EmployeeEntity> {
    try {
      const employee = new EmployeeEntity();
      Object.assign(employee, input);

      if (input.user) {
        // User data will be supplied if admin user requiring email account
        employee.user = await this.userService.save({
          type: UserTypeEnum.EMPLOYEE,
          ...input.user,
        });
      }

      const tempPin = orderCodeGenerator(4);

      const salt = bcryptjs.genSaltSync();
      employee.device_pin = bcryptjs.hashSync(tempPin, salt);
      employee.company = company;
      const savedEmployee = await this.save(employee);

      // Send unhashed temp pin for reset
      savedEmployee.device_pin = tempPin;

      return savedEmployee;
    } catch (err) {
      throw new ApolloError('employee', '', err);
    }
  }

  public async adminLogin(
    input: UserLoginInput,
    req: ExpressRequest,
  ): Promise<EmployeeEntity> {
    try {
      const user = await this.userService.findOne({
        where: { email: input.email },
      });

      if (!user || !bcryptjs.compareSync(input.password, user.password)) {
        throw new ApolloError('validation', '', {
          form: 'Invalid email or password',
        });
      }

      const employee = await this.findOne({ where: { user } });

      if (!employee) {
        throw Error('Employee not found by user');
      }

      employee.user = user;

      req.session.employeeId = employee.id;

      return employee;
    } catch (err) {
      throw new ApolloError('employee', '', err);
    }
  }

  public async deviceLogin(
    company: CompanyEntity,
    input: DeviceLoginInput,
    req: ExpressRequest,
  ): Promise<EmployeeEntity> {
    try {
      const employee = await this.repository
        .createQueryBuilder('employee')
        .where('employee.company = :companyId', { companyId: company.id })
        .andWhere('employee.nickname = :nickname', { nickname: input.nickname })
        .leftJoinAndSelect('employee.user', 'user')
        .getOne();

      // to do: look for employee.pin_is_temp = true and require reset

      if (
        !employee ||
        !employee.device_pin ||
        !bcryptjs.compareSync(input.device_pin, employee.device_pin)
      ) {
        throw new ApolloError('validation', '', {
          form: 'Invalid pin',
        });
      }

      req.session.employeeId = employee.id;

      return employee;
    } catch (err) {
      throw new ApolloError('employee', '', err);
    }
  }
}
