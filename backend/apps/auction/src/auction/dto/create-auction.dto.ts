import { ApiProperty } from "@nestjs/swagger";
import { Length, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateAuctionDto {
  @ApiProperty()
  @Length(3, 100, { message: "Tytuł musi być od 3 do 100 znaków" })
  title: string;

  @ApiProperty()
  @Length(5, 250, { message: "Krótki pis musi być od 5 do 250 znaków" })
  shortDescription: string;

  @ApiProperty()
  @Length(5, 2500, { message: "Długi pis musi być od 5 do 2500 znaków" })
  longDescription: string;

  @ApiProperty()
  @IsString({ message: "Link url musi być typu tekstowego" })
  @IsUrl(undefined, { message: "Adres zdjecia jest niepoprawny" })
  image: string;

  @ApiProperty()
  @IsNumber(undefined, { message: "Cena musi być w typie numerycznym" })
  price: number;
}
