import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma.config';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
