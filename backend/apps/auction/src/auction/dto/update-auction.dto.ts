import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsOptional,
  IsNumber,
  IsDateString,
  IsString,
} from 'class-validator';

export class UpdateAuctionDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 100)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 250)
  shortDescription?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 2500)
  longDescription?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
