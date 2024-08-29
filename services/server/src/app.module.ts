import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { MethodOverrideMiddleware } from '@/shared/middlewares/method-override.middleware';
import { LoggerMiddleware } from '@/shared/middlewares/logger.middleware';

import { PrismaModule } from '@/config/prisma.config';
import { TokensModule } from '@/shared/modules/tokens';
import { UsersModule } from '@/shared/modules/users';
import { AuthModule, AuthGuard } from '@/shared/modules/auth';
import { StorageModule } from '@/shared/modules/storage';

import { SearchModule } from './modules/search/search.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}.local`
    }),
    PrismaModule,
    TokensModule,
    UsersModule,
    AuthModule,
    StorageModule,
    SearchModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodOverrideMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
