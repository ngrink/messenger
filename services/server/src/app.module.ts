import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { MethodOverrideMiddleware } from '@/shared/middlewares/method-override.middleware';
import { LoggerMiddleware } from '@/shared/middlewares/logger.middleware';

import { PrismaModule } from '@/config/prisma.config';
import { TokensModule } from '@/shared/modules/tokens';
import { AccountsModule } from '@/shared/modules/accounts';
import { AuthModule, AuthGuard } from '@/shared/modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TokensModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodOverrideMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
