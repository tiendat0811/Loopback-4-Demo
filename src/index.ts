import {ApplicationConfig, AuthApplication} from './application';

export * from './application';
export * from './jwt-authentication-component';
export * from './keys';
export * from './models';
export * from './repositories';
export * from './services';
export * from './types';

export async function main(options: ApplicationConfig = {}) {
  const app = new AuthApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
// async function createAdmin() {
//     //check admin exists
//     console.log('check admin exists');
//     const admin = await this.userRepository.findOne({
//       where: {email: 'admin'},
//     });
//     if (admin) {
//       console.log('admin account exists');
//       return;
//     }
//     //create admin

//     const newUser = await this.userRepository.create({
//       email: 'admin',
//       password: 'admin',
//       emailVerified: true,
//     });
//     const password = await hash(newUser.password, await genSalt());
//     const savedUser = await this.userRepository.create(
//       _.omit(newUser, 'password'),
//     );
//     await this.userRepository.userCredentials(savedUser.id).create({password});
//     console.log('admin account created');
//   }

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
