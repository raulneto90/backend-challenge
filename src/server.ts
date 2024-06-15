import { app } from "./app";

const bootstrap = async () => {
  await app.listen({
    port: 3333,
  });
};

bootstrap();
