import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 15,
  })
  @Length(3, 15)
  firstName: string;

  @ApiProperty({
    minLength: 3,
    maxLength: 15,
  })
  @Length(3, 15)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 5,
    maxLength: 15,
  })
  @Length(5, 15)
  password: string;

  @ApiProperty()
  @Length(2, 100)
  city: string;

  @ApiProperty()
  @Length(2, 100)
  street: string;
}
