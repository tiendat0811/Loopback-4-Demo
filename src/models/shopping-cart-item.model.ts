import {Entity, model, property} from '@loopback/repository';

@model()
export class ShoppingCartItem extends Entity {
  @property({id: true})
  productId: string;
  @property()
  quantity: number;

  constructor(data?: Partial<ShoppingCartItem>) {
    super(data);
  }
}
