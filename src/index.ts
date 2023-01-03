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

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 5000),
      host: process.env.HOST,
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
