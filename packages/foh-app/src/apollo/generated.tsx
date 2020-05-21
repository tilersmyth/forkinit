import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type CompanyAddressEntity = {
  __typename?: 'CompanyAddressEntity';
  created_at: Scalars['Date'];
  updated_at: Scalars['Date'];
  id: Scalars['ID'];
  street: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  country: Scalars['String'];
  postal_code: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};


export type OrderPointEntity = {
  __typename?: 'OrderPointEntity';
  created_at: Scalars['Date'];
  updated_at: Scalars['Date'];
  id: Scalars['ID'];
  label: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
};

export type CompanyEntity = {
  __typename?: 'CompanyEntity';
  created_at: Scalars['Date'];
  updated_at: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  setup: Scalars['Boolean'];
  order_points: Array<OrderPointEntity>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  created_at: Scalars['Date'];
  updated_at: Scalars['Date'];
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  context: UserContextEnum;
};

export enum UserContextEnum {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE'
}

export type EmployeeEntity = {
  __typename?: 'EmployeeEntity';
  created_at: Scalars['Date'];
  updated_at: Scalars['Date'];
  id: Scalars['ID'];
  nickname: Scalars['String'];
  device_pin: Scalars['String'];
  pin_is_temp: Scalars['Boolean'];
  company: CompanyEntity;
  user?: Maybe<UserEntity>;
};

export type Query = {
  __typename?: 'Query';
  employee?: Maybe<EmployeeEntity>;
  findCompany: CompanyEntity;
};

export type Mutation = {
  __typename?: 'Mutation';
  employeeCreate: EmployeeEntity;
  employeeAdminLogin: EmployeeEntity;
  employeeDeviceLogin: EmployeeEntity;
  createCompany: CompanyEntity;
  createCompanyAddress: CompanyAddressEntity;
  createOrderPoint: OrderPointEntity;
};


export type MutationEmployeeCreateArgs = {
  input: CreateEmployeeInput;
};


export type MutationEmployeeAdminLoginArgs = {
  input: UserLoginInput;
};


export type MutationEmployeeDeviceLoginArgs = {
  input: DeviceLoginInput;
};


export type MutationCreateCompanyArgs = {
  name: Scalars['String'];
};


export type MutationCreateCompanyAddressArgs = {
  input: CompanyAddressInput;
};


export type MutationCreateOrderPointArgs = {
  input: OrderPointInput;
};

export type CreateEmployeeInput = {
  nickname: Scalars['String'];
  user?: Maybe<UserRegisterInput>;
};

export type UserRegisterInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeviceLoginInput = {
  nickname: Scalars['String'];
  device_pin: Scalars['String'];
};

export type CompanyAddressInput = {
  street: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};

export type OrderPointInput = {
  label: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

export type EmployeeAdminLoginMutationVariables = {
  input: UserLoginInput;
};


export type EmployeeAdminLoginMutation = (
  { __typename?: 'Mutation' }
  & { employeeAdminLogin: (
    { __typename?: 'EmployeeEntity' }
    & Pick<EmployeeEntity, 'id'>
  ) }
);


export const EmployeeAdminLoginDocument = gql`
    mutation EmployeeAdminLogin($input: UserLoginInput!) {
  employeeAdminLogin(input: $input) {
    id
  }
}
    `;
export type EmployeeAdminLoginMutationFn = ApolloReactCommon.MutationFunction<EmployeeAdminLoginMutation, EmployeeAdminLoginMutationVariables>;
export type EmployeeAdminLoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EmployeeAdminLoginMutation, EmployeeAdminLoginMutationVariables>, 'mutation'>;

    export const EmployeeAdminLoginComponent = (props: EmployeeAdminLoginComponentProps) => (
      <ApolloReactComponents.Mutation<EmployeeAdminLoginMutation, EmployeeAdminLoginMutationVariables> mutation={EmployeeAdminLoginDocument} {...props} />
    );
    
export type EmployeeAdminLoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EmployeeAdminLoginMutation, EmployeeAdminLoginMutationVariables>
    } & TChildProps;
export function withEmployeeAdminLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EmployeeAdminLoginMutation,
  EmployeeAdminLoginMutationVariables,
  EmployeeAdminLoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EmployeeAdminLoginMutation, EmployeeAdminLoginMutationVariables, EmployeeAdminLoginProps<TChildProps, TDataName>>(EmployeeAdminLoginDocument, {
      alias: 'employeeAdminLogin',
      ...operationOptions
    });
};
export type EmployeeAdminLoginMutationResult = ApolloReactCommon.MutationResult<EmployeeAdminLoginMutation>;
export type EmployeeAdminLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<EmployeeAdminLoginMutation, EmployeeAdminLoginMutationVariables>;