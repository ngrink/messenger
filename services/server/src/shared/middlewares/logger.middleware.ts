import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      const { ip, method, path, httpVersion } = req;
      const { statusCode } = res;
      const referer = req.headers['referer'] || '-';
      const userAgent = req.headers['user-agent'] || '-';
      const contentLength = res.get('content-length') || 0;

      const message = this.configService.get('NODE_ENV') === 'production'
          ? `"${method} ${path} HTTP/${httpVersion}" ${statusCode} ${contentLength} ${referer} ${ip} ${userAgent}`
          : `"${method} ${path} HTTP/${httpVersion}" ${statusCode} ${contentLength}`;

      if (statusCode < 500) {
        this.logger.log(message);
      } else {
        this.logger.error(message);
      }
    });

    next();
  }
}
