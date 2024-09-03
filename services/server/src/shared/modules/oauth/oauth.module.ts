import { Module } from '@nestjs/common';

import { UsersModule } from '@/shared/modules/users';
import { AuthModule } from '@/shared/modules/auth';

import { GithubStrategy } from './strategies';
import { OAuthController } from './oauth.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [OAuthController],
  providers: [
    GithubStrategy
  ],
})
export class OAuthModule {}
