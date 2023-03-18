import { DataSource } from 'typeorm';
import { Auction } from '../auction/models/auction.entity';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'db',
  logging: true,
  entities: [Auction],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
});
