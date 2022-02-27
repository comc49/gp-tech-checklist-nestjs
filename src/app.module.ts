import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ChecklistModule } from './checklist/checklist.module';
import { ChecklistItemModule } from './checklist-item/checklist-item.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

let envFilePath = '.env.dev';
let synchronizeBool = true;

console.log(`Running in ${process.env.ENVIRONMENT}`)
if (process.env.ENVIRONMENT === 'production') {
  envFilePath = '.env.prod';
  synchronizeBool = false;
}

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath}),
    PassportModule.register({session: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: synchronizeBool, // don't use true for prod
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    CategoryModule,
    ChecklistModule,
    ChecklistItemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
