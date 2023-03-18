import { DataSource } from 'typeorm';
import { User } from '../user/model/user.entity';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'db',
  logging: true,
  entities: [User],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
});
