import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { UserModule } from "../user/user.module";

@Module({
  controllers: [AuctionController],
  providers: [AuctionService],
  exports: [AuctionService],
  imports: [UserModule],
})
export class AuctionModule {}
