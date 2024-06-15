import { app } from './app';
import { env } from './env/env';

const bootstrap = async () => {
  await app.listen({
    port: env.PORT,
  });
};

bootstrap();
