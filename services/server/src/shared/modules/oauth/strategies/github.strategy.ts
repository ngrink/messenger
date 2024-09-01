import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-github2'

import { UsersService, CreateOAuthUserDto } from '@/shared/modules/users'
import { OAuthProvider } from "../enums";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('OAUTH_GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('OAUTH_GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const data: CreateOAuthUserDto = {
      name: profile.displayName,
      email: profile.emails[0].value,

      provider: OAuthProvider.GITHUB,
      providerSub: profile.id,
    };

    let user = await this.usersService
      .getUserByProvider(data.provider, data.providerSub)
      .catch(() => null)

    if (!user) {
      user = await this.usersService.createUserByProvider(data);
    }

    done(null, user);
  }
}
