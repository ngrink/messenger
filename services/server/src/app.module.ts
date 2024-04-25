import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './config/prisma.config';
import { AccountsModule } from './shared/modules/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
