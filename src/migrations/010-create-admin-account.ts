import {AuthApplication} from '../application';
import {UserRepository} from '../repositories';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

export async function admincreate(app: AuthApplication) {
  const userRepository = await app.getRepository(UserRepository);
  const found = await userRepository.findOne({where: {email: 'admin'}});
  if (found) {
    return;
  }
  const newUser = {
    email: 'admin',
    password: 'admin',
    roles: ['admin'],
  };
  const password = await hash(newUser.password, await genSalt());
  const savedUser = await userRepository.create(_.omit(newUser, 'password'));
  await userRepository.userCredentials(savedUser.id).create({password});
}
