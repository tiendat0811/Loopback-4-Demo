import {repository} from '@loopback/repository';
import {MigrationScript, migrationScript} from 'loopback4-migration';
import {UserRepository} from '../repositories';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

@migrationScript()
export class CreateAdminAccount implements MigrationScript {
  version = '1.0.1';
  scriptName = CreateAdminAccount.name;
  description = 'add full name to users by combining first and last name';

  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async up(): Promise<any> {
    //check admin exists
    console.log('check admin exists');
    const admin = await this.userRepository.findOne({
      where: {email: 'admin'},
    });
    if (admin) {
      console.log('admin account exists');
      return;
    }
    //create admin

    const newUser = await this.userRepository.create({
      email: 'admin',
      password: 'admin',
      emailVerified: true,
    });
    const password = await hash(newUser.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUser, 'password'),
    );
    await this.userRepository.userCredentials(savedUser.id).create({password});
    console.log('admin account created');
  }

  async down(): Promise<void> {
    //
  }
}
