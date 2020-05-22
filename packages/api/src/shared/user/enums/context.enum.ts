import { registerEnumType } from '@nestjs/graphql';

export enum UserContextEnum {
  CUSTOMER = 'customer',
  EMPLOYEE = 'employee',
}

registerEnumType(UserContextEnum, {
  name: 'UserContextEnum',
});
