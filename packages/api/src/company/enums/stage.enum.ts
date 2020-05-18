import { registerEnumType } from '@nestjs/graphql';

export enum CompanyStageEnum {
  ADDRESS,
  DEVICES,
  MEMBERS,
  MENUS,
  ORDER_POINTS,
}

registerEnumType(CompanyStageEnum, {
  name: 'CompanyStageEnum',
});
