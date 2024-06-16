import { app } from './app';
import { env } from './config/env/env';

const bootstrap = async () => {
  await app.listen({
    port: env.PORT,
  });
};

bootstrap();
