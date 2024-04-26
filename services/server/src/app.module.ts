import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './config/prisma.config';
import { TokensModule } from './shared/modules/tokens';
import { AccountsModule } from './shared/modules/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TokensModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
