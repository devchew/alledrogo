import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class AddBidDto {
  @ApiProperty()
  @Min(0)
  @IsNumber()
  price: number;
}
