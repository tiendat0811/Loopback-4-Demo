import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Order} from './order.model';
import {Product} from './product.model';

@model()
export class OrderItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @belongsTo(() => Order)
  orderId: number;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
