import { Controller, Get, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UsersService } from '@/shared/modules/users';
import { Cookies } from '@/shared/decorators';

import { AuthService } from './auth.service';
import { Authenticated, CurrentUser } from './decorators';
import { LoginDto } from './dto/login.dto';
import { AccessTokenDto } from './dto/tokens.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly usersService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginByCredentials(
    @Body() data: LoginDto,
    @Res({passthrough: true}) res: Response
  ) {
    const tokens = await this.authService.loginByCredentials(data);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refresh"
    })

    return { accessToken: tokens.accessToken }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @Authenticated()
  async logout(@CurrentUser() user: AccessTokenDto) {
    return this.authService.logout();
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    const tokens = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refresh"
    })

    return { accessToken: tokens.accessToken } 
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @Authenticated()
  async getAuthUser(
    @CurrentUser() user: AccessTokenDto,
  ) {
    const userData = await this.usersService.getUser(user.id)

    return { user: userData } 
  }
}
