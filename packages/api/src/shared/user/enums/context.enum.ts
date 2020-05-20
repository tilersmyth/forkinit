import { registerEnumType } from '@nestjs/graphql';

export enum UserContextEnum {
  CUSTOMER,
  EMPLOYEE,
}

registerEnumType(UserContextEnum, {
  name: 'UserContextEnum',
});
