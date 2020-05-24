import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-core';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { CrudService } from '../../base/crud.service';
import { EmployeeEntity } from './employee.entity';
import { CreateEmployeeInput } from './inputs/create.input';
import { CompanyEntity } from '../company.entity';
import { UserService } from '../../shared/user/user.service';
import { UserContextEnum } from '../../shared/user/enums/context.enum';
import { orderCodeGenerator } from '../../utils/pin-generator';
import { ExpressRequest } from '../../types';
import { UserLoginInput } from '../../shared/user/inputs/login.input';
import { DeviceLoginInput } from './inputs/device-login.input';
import { ConfigService } from 'api/src/core/config/config.service';

@Injectable()
export class EmployeeService extends CrudService<EmployeeEntity> {
  constructor(
    @InjectRepository(EmployeeEntity)
    protected readonly repository: Repository<EmployeeEntity>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super();
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
          context: UserContextEnum.EMPLOYEE,
          ...input.user,
        });
      }

      const tempPin = orderCodeGenerator(4);

      const salt = genSaltSync();
      employee.device_pin = hashSync(tempPin, salt);
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

      if (!user || !compareSync(input.password, user.password)) {
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

  public async staffLogin(
    company: CompanyEntity,
    input: DeviceLoginInput,
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
        !compareSync(input.device_pin, employee.device_pin)
      ) {
        throw new ApolloError('validation', '', {
          form: 'Invalid pin',
        });
      }

      const token = jwt.sign(
        { staffId: employee.id },
        this.configService.JWT_SECRET,
      );

      console.log(token);

      return employee;
    } catch (err) {
      throw new ApolloError('employee', '', err);
    }
  }
}
