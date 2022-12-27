import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Order, OrderRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  public readonly user: BelongsToAccessor<User, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    customerRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Order, dataSource);
    this.user = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
  }
}
