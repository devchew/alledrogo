import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  firstName: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  pwdHash: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  email: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  city: string;

  @Column({
    length: 100,
  })
  @ApiProperty()
  street: string;
}
