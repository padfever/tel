import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';

import { ApplicationModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  app.use(json());
  await app.listen(config.get('app:port'));
}

bootstrap();
