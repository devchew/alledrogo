import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNumber, IsString } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty()
  @Length(3, 100)
  title: string;

  @ApiProperty()
  @Length(5, 250)
  shortDescription: string;

  @ApiProperty()
  @Length(5, 2500)
  longDescription: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
