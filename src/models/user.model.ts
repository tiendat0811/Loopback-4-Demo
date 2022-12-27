import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Order} from './order.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  // must keep it
  @property({
    type: 'string',
  })
  username?: string;


  // must keep it
  // feat email unique
  @hasMany(() => Order)
  orders: Order[];
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property.array({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
