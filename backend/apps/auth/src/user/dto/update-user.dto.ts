import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 50)
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 50)
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, 100)
  city?: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, 100)
  street?: string;
}
