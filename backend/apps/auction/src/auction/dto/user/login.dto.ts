import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class LoginDto {
  @ApiProperty({ minLength: 3, maxLength: 15, example: "john.doe@example.com" })
  @IsEmail(undefined, { message: "Email jest nie poprawny" })
  email: string;

  @ApiProperty({ minLength: 5, maxLength: 15, example: "example" })
  @Length(5, 15, { message: "Hasło musi być od 5 do 15 znaków" })
  password: string;
}
