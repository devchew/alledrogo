import { AuthService } from "./auth.service";
import { Body, Controller, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "../auction/dto/user/register.dto";
import { LoginDto } from "../auction/dto/user/login.dto";
import { TokenDto } from "../auction/dto/user/token.dto";
import { AuthGuard } from "../guards/auth-guard/AuthGuard.guards";
import { ChangePasswordDto } from "../auction/dto/user/change-password.dto";
import { AuthorisedRequest } from "../types/request/request.type";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'User with given email already exists',
  })
  async userRegister(@Body() registerDto: RegisterDto) {
    return this.authService.userRegister(registerDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: TokenDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Patch("change-password")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async changePassword(
    @Request() request: AuthorisedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.userChangePassword(request.user, changePasswordDto);
  }
}
