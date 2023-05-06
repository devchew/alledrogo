import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(3, 50, { message: "Imie musi być od 3 do 50 znaków" })

  firstName: string;

  @ApiProperty()
  @Length(3, 50, { message: "Nazwisko musi być od 3 do 50 znaków" })

  lastName: string;

  @ApiProperty()
  @IsEmail(undefined, { message: "Email jest nie poprawny" })

  email: string;

  @ApiProperty()
  @Length(5, 15, { message: "Hasło musi być od 5 do 15 znaków" })

  password: string;

  @ApiProperty()
  @Length(2, 100, { message: "Nazwa miasta musi być od 2 do 100 znaków" })

  city: string;

  @ApiProperty()
  @Length(2, 100, { message: "Nazwa ulicy musi być od 2 do 100 znaków" })

  street: string;
}
