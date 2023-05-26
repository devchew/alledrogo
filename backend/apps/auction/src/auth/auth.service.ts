import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../auction/dto/user/register.dto';
import { Config } from '../config/config';
import { LoginDto } from '../auction/dto/user/login.dto';
import { RequestUser } from '../types/request/request.type';
import { ChangePasswordDto } from '../auction/dto/user/change-password.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async userRegister(registerDto: RegisterDto) {
    try {
      await this.httpService.axiosRef.post(
        `${Config.userApi}/auth/register`,
        registerDto,
      );
    } catch (e) {
      if (e.response.status === 409) {
        throw new ConflictException('Email jest już zajęty');
      } else if (e.response.status === 400) {
        throw new BadRequestException('Błąd walidacji');
      } else {
        throw new InternalServerErrorException(
          'Ops. Spróbuj ponowanie później',
        );
      }
    }
  }

  async userLogin(loginDto: LoginDto) {
    try {
      const loginRes = await this.httpService.axiosRef.post(
        `${Config.userApi}/auth/login`,
        loginDto,
      );
      return loginRes.data;
    } catch (e) {
      if (e.response.status === 401) {
        throw new UnauthorizedException('Brak dostępu');
      } else if (e.response.status === 400) {
        throw new BadRequestException('Błąd walidacji');
      } else {
        throw new InternalServerErrorException(
          'Ops. Spróbuj ponowanie później',
        );
      }
    }
  }

  async userChangePassword(
    { authorization }: RequestUser,
    changePasswordDto: ChangePasswordDto,
  ) {
    try {
      const updatePasswordRes = await this.httpService.axiosRef.patch(
        `${Config.userApi}/auth/change-password`,
        changePasswordDto,
        {
          headers: {
            authorization,
          },
        },
      );
      return updatePasswordRes.data;
    } catch (e) {
      if (e.response.status === 401) {
        throw new UnauthorizedException('Brak dostępu');
      } else if (e.response.status === 400) {
        throw new BadRequestException('Błąd walidacji');
      } else {
        throw new InternalServerErrorException(
          'Ops. Spróbuj ponowanie później',
        );
      }
    }
  }
}
