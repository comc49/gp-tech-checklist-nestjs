import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session'
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { TypeORMSession } from './typeorm/entities/Session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const sessionRepo = getRepository(TypeORMSession);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}
bootstrap();
