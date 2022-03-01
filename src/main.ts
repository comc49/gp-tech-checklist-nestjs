import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session'
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { TypeORMSession } from './typeorm/entities/Session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3001;
  const sessionRepo = getRepository(TypeORMSession);

  app.enableCors();
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'https://studio.apollographql.com'
  //   ],
  //   credentials: false,
  // });
  app.setGlobalPrefix('api');
  app.use(passport.initialize());
  app.use(
    session({
      cookie: {
        maxAge: 10000,
      },
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo),
    }),
  );
  app.use(passport.session());
  console.log(`Running in ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
