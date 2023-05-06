import { ApiProperty } from "@nestjs/swagger";
import {
  Length,
  IsOptional,
  IsString, IsUrl
} from "class-validator";

export class UpdateAuctionDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 100, { message: "Tytuł musi być od 3 do 100 znaków" })
  title?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 250, { message: "Krótki pis musi być od 5 do 250 znaków" })
  shortDescription?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 2500, { message: "Długi pis musi być od 5 do 2500 znaków" })

  longDescription?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "Link url musi być typu tekstowego" })
  @IsUrl(undefined, { message: "Adres zdjecia jest niepoprawny" })
  image?: string;
}
