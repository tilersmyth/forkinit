/* eslint-disable @typescript-eslint/camelcase */
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';
import { validate, ValidatorOptions, ValidationError } from 'class-validator';
import { DateTime } from 'luxon';
import { ApolloError } from 'apollo-server-core';

import { BaseEntity } from './base.entity';

export class CrudService<T extends BaseEntity> {
  protected repository?: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  private repo(): Repository<T> {
    if (!this.repository) {
      throw Error('Repository must be defined when using CrudService');
    }

    return this.repository;
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo().find(options);
  }

  public async findOneById(id: string): Promise<T> {
    return this.repo().findOneOrFail(id);
  }

  public async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    // https://github.com/typeorm/typeorm/issues/2500
    try {
      // Need to await to catch error here to return null
      const user = await this.repo().findOneOrFail(options);
      return user;
    } catch (err) {
      return null;
    }
  }

  // Keep create() seperate from save() for transaction use
  public async create(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.repo().create(data);
    entity.created_at = DateTime.utc();
    entity.updated_at = DateTime.utc();

    await this.validate(entity, {
      groups: ['save'],
    });
    return entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    const entity: T = await this.create(data);
    return entity.save();
  }

  public async update(data: DeepPartial<T> | T): Promise<T> {
    const id = String(data.id || '');
    return this.patch(id, data);
  }

  public async patch(id: string, data: DeepPartial<T> | T): Promise<T> {
    let entity: T;
    if (data instanceof BaseEntity) {
      entity = data;
    } else {
      entity = await this.findOneById(id);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: dataId, ...rest } = data;
      this.repo().merge(entity, rest as DeepPartial<T>);
    }
    let { created_at } = entity;
    if (!created_at) {
      created_at = DateTime.utc();
    }

    entity.created_at = created_at;
    entity.updated_at = DateTime.utc();

    await this.validate(entity, {
      groups: ['update'],
    });
    return entity.save();
  }

  public async delete(id: string): Promise<T> {
    const entity: T = await this.findOneById(id);
    await this.repo().delete(id);
    return entity;
  }

  private errorReducer = (
    acc: object,
    { constraints, property }: ValidationError,
  ) =>
    constraints
      ? { [property]: constraints[Object.keys(constraints)[0]], ...acc }
      : acc;

  protected async validate(entity: T, options?: ValidatorOptions) {
    const errors = await validate(entity, {
      validationError: {
        target: false,
        value: false,
      },
      options,
    } as ValidatorOptions);

    if (errors.length > 0) {
      throw new ApolloError(
        'validation',
        '',
        errors.reduce(this.errorReducer, {}),
      );
    }
  }
}
