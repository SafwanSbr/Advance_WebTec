import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000000,
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:8000', // replace with the origin of your client app
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
