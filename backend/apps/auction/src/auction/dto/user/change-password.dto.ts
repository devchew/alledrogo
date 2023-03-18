import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ minLength: 5, maxLength: 15, example: 'example' })
  @Length(5, 15)
  oldPassword: string;

  @ApiProperty({ minLength: 5, maxLength: 15, example: 'example' })
  @Length(5, 15)
  newPassword: string;
}
