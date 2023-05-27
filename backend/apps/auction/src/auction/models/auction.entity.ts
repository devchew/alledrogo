import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Auction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  id: string;

  @Column({
    length: 36
  })
  seller: string;

  @Column({
    length: 36,
    default: null
  })
  winner: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @Column({
    length: 50
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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  price: number;

  @Column()
  @ApiProperty()
  endDate: Date;

  @Column({ default: null })
  @ApiProperty()
  bids: string;

  @Column({ default: 0 })
  @ApiProperty()
  status: boolean;
}
