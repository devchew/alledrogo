import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Auction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({
    length: 36,
  })
  seller: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @Column({
    length: 50,
  })
  @ApiProperty()
  title: string;

  @Column({
    length: 50,
  })
  shortDescription: string;

  @Column({
    length: 250,
  })
  longDescription: string;

  @Column({
    default: null,
  })
  @ApiProperty()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  @ApiProperty()
  endDate: Date;

  @Column({ default: null })
  @ApiProperty()
  offers: string;
}
