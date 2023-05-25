import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Config } from '../config/config';
import { RequestUser } from '../types/request/request.type';
import { UpdateUserDto } from '../auction/dto/user/update-user.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  @Inject(HttpService) private readonly httpService: HttpService;

  async getAllUsers() {
    try {
      const usersRes = await this.httpService.axiosRef.get(
        `${Config.userApi}/user`,
      );
      return usersRes.data;
    } catch (e) {
      throw new InternalServerErrorException('Ops. Spróbuj ponowanie później');
    }
  }

  async findOneUser(id: string) {
    try {
      const userRes = await this.httpService.axiosRef.get(
        `${Config.userApi}/user/${id}`,
      );
      return userRes.data;
    } catch (e) {
      if (e.response.status === 404) {
        throw new NotFoundException('Nie znaleziono użytkownika');
      }
      throw new InternalServerErrorException('Ops. Spróbuj ponowanie później');
    }
  }

  async deleteUser({ authorization }: RequestUser) {
    try {
      await this.httpService.axiosRef.delete(`${Config.userApi}/user`, {
        headers: {
          authorization,
        },
      });
    } catch (e) {
      if (e.response.status === 401) {
        throw new UnauthorizedException('Not found user');
      } else {
        throw new InternalServerErrorException(
          'Ops. Spróbuj ponowanie później',
        );
      }
    }
  }

  async updateUser(
    { authorization }: RequestUser,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      const updateUser = await this.httpService.axiosRef.patch(
        `${Config.userApi}/user/`,
        updateUserDto,
        {
          headers: {
            authorization,
          },
        },
      );
      return updateUser.data;
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
