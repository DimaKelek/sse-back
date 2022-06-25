import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`Server started on http://localhost:${PORT}`),
  );
};

start();
