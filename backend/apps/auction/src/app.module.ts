import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionModule } from './auction/auction.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Global, Module } from '@nestjs/common';
import { sqliteDataSource } from './db/datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqliteDataSource.options),
    AuctionModule,
    HttpModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpModule],
  exports: [HttpModule],
})
@Global()
@Module({
  providers: [HttpModule],
  exports: [HttpModule],
})
export class AppModule {}
