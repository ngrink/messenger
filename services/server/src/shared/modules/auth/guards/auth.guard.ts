import { CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { TokensService } from '@/shared/modules/tokens';
import { AuthException } from '../auth.exceptions';
import { AUTH_KEY } from '../decorators/authenticated.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthRequired = this.reflector.getAllAndOverride<boolean>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isAuthRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw AuthException.Unauthorized()
    }

    const payload = this.tokenService.verifyAccessToken(token);
    if (!payload) {
      throw AuthException.Unauthorized()
    }

    request['user'] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
