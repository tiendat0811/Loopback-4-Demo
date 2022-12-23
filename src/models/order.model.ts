import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';
import {ShoppingCartItem} from './shopping-cart-item.model';

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
  date?: string;

  @property.array(ShoppingCartItem, {required: true})
  products: ShoppingCartItem[];

  // Each order belongs to a user, indentified by its id (userId)
  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
