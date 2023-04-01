import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Auction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  user: string;
  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  price: number;
}
