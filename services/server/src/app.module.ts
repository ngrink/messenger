import { Module } from '@nestjs/common';

import { PrismaModule } from './config/prisma.config';
import { AccountsModule } from './shared/modules/accounts/accounts.module';

@Module({
  imports: [
    PrismaModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
