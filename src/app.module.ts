import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
dotenv.config();
import { IsAuthenticatedMiddleware } from './middlewares/is-authenticated/is-authenticated.middleware';
import { ForumModule } from './forum/forum.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TalentModule } from './talent/talent.module';
import { ProjectModule } from './project/project.module';
import { ClientModule } from './client/client.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ForumModule,
    CategoryModule,
    AuthModule,
    TalentModule,
    ProjectModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(IsAuthenticatedMiddleware)
      .forRoutes('auth')
      .apply(HelmetMiddleware)
      .forRoutes(''); // permet d'ajouter des headers contre des attaques...
  }
}
