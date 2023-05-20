import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Config } from '../../config/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WithUserInterceptor implements NestInterceptor {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
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
    } catch (e) {
      return next.handle();
    }

    return next.handle(); // eq. operacje RxJs
  }
}
