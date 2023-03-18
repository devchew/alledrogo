import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { Config } from '../../config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    try {
      const responseUserApi = await this.httpService.axiosRef.get(
        `${Config.userApi}/auth`,
        {
          headers: {
            authorization,
          },
        },
      );
      request['user'] = responseUserApi.data;
      request['user']['authorization'] = authorization;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
