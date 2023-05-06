import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 50, { message: "Imie musi być od 3 do 50 znaków" })

  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 50, { message: "Nazwisko musi być od 3 do 50 znaków" })
  lastName?: string;

  @ApiProperty()
  @IsEmail(undefined, { message: "Email jest nie poprawny" })
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, 100, { message: "Nazwa miasta musi być od 2 do 100 znaków" })
  city?: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, 100, { message: "Nazwa ulicy musi być od 2 do 100 znaków" })
  street?: string;
}
