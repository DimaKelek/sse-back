import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });

  await app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`🟢 Server started on http://localhost:${PORT}`),
  );
};

start();
