import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {User} from './user.model';
import {OrderItem} from './order-item.model';

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
    type: 'string',
  })
  paymentMethod?: string;

  @property({
    type: 'string',
  })
  paymentStatus?: string;

  @property({
    type: 'string',
  })
  delivery?: string;

  @property({
    type: 'string',
  })
  deliveryMethod?: string;

  @hasMany(() => OrderItem)
  orderItems?: OrderItem[];

  @belongsTo(() => User)
  userId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
