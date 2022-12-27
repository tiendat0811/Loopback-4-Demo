import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {OrderItem} from './order-item.model';
import {User} from './user.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  createAt?: string;

  @property({
    type: 'number',
  })
  totalPrice?: number;

  @belongsTo(() => User, {name: 'user'})
  userId: string;

  @hasMany(() => OrderItem)
  orderItems: OrderItem[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
