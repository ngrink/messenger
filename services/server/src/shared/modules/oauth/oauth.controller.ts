import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '@prisma/client';

import { AuthService, CurrentUser } from '@/shared/modules/auth';
import { GithubGuard } from './guards';

@Controller('oauth')
export class OAuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('github')
  @UseGuards(GithubGuard)
  async loginByGithub() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  @ApiExcludeEndpoint()
  async loginByGithubCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refresh"
    })

    res.redirect(`http://localhost:5173/login?accessToken=${accessToken}`)
  }
}
