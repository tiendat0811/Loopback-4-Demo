// authentication-middleware.ts

import {Next} from '@loopback/core';
import {Request, Response} from '@loopback/rest';

export async function AuthenticationMiddleware(
  request: Request,
  response: Response,
  next: Next,
) {
  console.log('AuthenticationMiddleware ran');
  return next();
}
