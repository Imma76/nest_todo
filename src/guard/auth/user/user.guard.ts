import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest().headers;
    const headers = request.headers;
    if (headers.authorization === undefined) throw new UnauthorizedException();
    const [type, token] = headers.authorization.split(' ');
    if (type !== 'Bearer') throw new UnauthorizedException();
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.salt,
      });
      if (!payload) {
        throw new UnauthorizedException();
      }

      request.user = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
