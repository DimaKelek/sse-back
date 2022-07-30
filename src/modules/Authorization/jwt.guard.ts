import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authorizationHeaderHandler } from '../../common/helpers';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const token = authorizationHeaderHandler(request.headers.authorization);
      const secret = process.env.ACCESS_SECRET_KEY;
      const user = this.jwtService.verify(token, { secret });

      return !!user;
    } catch (e) {
      return false;
    }
  }
}
