import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import { JwtAuthGuard } from '../jwt/guards/jwt-auth.guard';
import { AuthorisedRequest } from '../types/request/request.type';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [User],
  })
  getAll() {
    return this.userService.findAllWithoutPassword();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async find(@Param('id') id: string) {
    return this.userService.findOneWithoutPassword(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  delete(@Request() request: AuthorisedRequest) {
    return this.userService.delete(request.user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  update(
    @Request() request: AuthorisedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(request.user.id, updateUserDto);
  }
}
