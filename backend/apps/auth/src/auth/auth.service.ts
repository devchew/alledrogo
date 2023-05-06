import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneWithPassword({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Brak Dostępu');
    }

    const isValidPassword = await argon2.verify(
      user.pwdHash,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Brak Dostępu');
    }

    const accessToken = this.jwtService.sign(user.id);

    return { accessToken };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOneWithPassword({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException('Brak Dostępu');
    }

    const isValidPassword = await argon2.verify(
      user.pwdHash,
      changePasswordDto.oldPassword,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Brak Dostępu');
    }
    return this.usersService.updatePassword(userId, {
      password: changePasswordDto.newPassword,
    });
  }

  async register(userData: RegisterDto) {
    await this.usersService.create(userData);
  }
}
