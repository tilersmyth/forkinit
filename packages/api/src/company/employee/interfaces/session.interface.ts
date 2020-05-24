import { EmployeeEntity } from '../employee.entity';

export interface IEmployeeSession {
  admin: EmployeeEntity;
  staff?: EmployeeEntity;
}
