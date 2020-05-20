import { registerEnumType } from '@nestjs/graphql';

export enum UserTypeEnum {
  CUSTOMER,
  EMPLOYEE,
}

registerEnumType(UserTypeEnum, {
  name: 'UserTypeEnum',
});
