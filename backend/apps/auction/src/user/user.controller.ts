import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  Request,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../auction/models/userTypeForDocs.entity';
import { AuthGuard } from '../guards/auth-guard/AuthGuard.guards';
import { AuthorisedRequest } from '../types/request/request.type';
import { UpdateUserDto } from '../auction/dto/user/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiResponse({
    status: 200,

    description: 'Success',
    type: [User],
  })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: User,
  })
  async profile(@Request() request: AuthorisedRequest) {
    console.log(request.user.id);
    return this.userService.findOneUser(request.user.id);
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
    return this.userService.findOneUser(id);
  }

  @Delete()
  @UseGuards(AuthGuard)
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
    return this.userService.deleteUser(request.user);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
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
    return this.userService.updateUser(request.user, updateUserDto);
  }
}
