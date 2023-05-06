import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class UpdatePasswordDto {
  @ApiProperty()
  @Length(5, 15, { message: "Hasło musi być od 5 do 15 znaków" })

  password: string;
}
