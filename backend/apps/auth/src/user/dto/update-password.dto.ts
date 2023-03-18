import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @Length(5, 15)
  password: string;
}
