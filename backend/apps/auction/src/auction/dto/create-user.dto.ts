import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(3, 15)
  firstName: string;

  @ApiProperty()
  @Length(3, 15)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(5, 15)
  password: string;

  @ApiProperty()
  @Length(2, 100)
  city: string;

  @ApiProperty()
  @Length(2, 100)
  street: string;
}
