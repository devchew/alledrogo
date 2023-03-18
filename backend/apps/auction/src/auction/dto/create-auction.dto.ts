import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty()
  @Length(3, 50)
  title: string;

  @ApiProperty()
  @Length(5, 15)
  shortDescription: string;

  @ApiProperty()
  @Length(5, 250)
  longDescription: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsDateString()
  endDate: Date;
}
