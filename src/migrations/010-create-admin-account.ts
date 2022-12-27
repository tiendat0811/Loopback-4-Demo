import {AuthApplication} from '../application';
import {UserRepository} from '../repositories';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
//read csv file
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../../data/adminAccount.csv');

export async function admincreate(app: AuthApplication) {
  const userRepository = await app.getRepository(UserRepository);
  const found = await userRepository.findOne({
    where: {email: 'admin@gmail.com'},
  });
  if (found) {
    return;
  }
  let newUser: any = {
    email: '',
    password: '',
    roles: [],
  };
  const csvString = fs.readFileSync(filePath, 'utf-8');
  var lines = csvString.split('\n');
  var headers = lines[0].split(',');
  var values = lines[1].split(',');
  for (var i = 0; i < headers.length; i++) {
    if (headers[i] == 'roles') {
      var string = values[i]
        .replaceAll(';', ',')
        .replaceAll('"', '')
        .replaceAll(' ', '')
        .replaceAll('[', '')
        .replaceAll(']', '');
      var roles = [];
      for (var j = 0; j < string.split(',').length; j++) {
        roles.push(string.split(',')[j]);
      }
      newUser[headers[i]] = roles;
    } else {
      newUser[headers[i]] = values[i];
    }
  }
  const password = await hash(newUser.password, await genSalt());
  const savedUser = await userRepository.create(_.omit(newUser, 'password'));
  await userRepository.userCredentials(savedUser.id).create({password});
}
