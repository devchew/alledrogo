import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({ minLength: 5, maxLength: 15, example: "example" })
  @Length(5, 15, { message: "Hasło musi być od 5 do 15 znaków" })
  oldPassword: string;

  @ApiProperty({ minLength: 5, maxLength: 15, example: "example" })
  @Length(5, 15, { message: "Hasło musi być od 5 do 15 znaków" })
  newPassword: string;
}
