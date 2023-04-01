import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Auction } from './models/auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AddBidDto } from './dto/bid/add-bid.dto';

@Injectable()
export class AuctionService {
  async findAll() {
    return await Auction.find();
  }

  async findOne(id: string) {
    const auction = await Auction.findOne({
      where: { id },
    });
    if (auction === null) throw new NotFoundException();
    return auction;
  }

  async create(userId: string, createAuctionDto: CreateAuctionDto) {
    const createAuction = Auction.create({
      ...createAuctionDto,
      seller: userId,
    });
    return await createAuction.save();
  }

  async delete(userId: string, auctionId: string) {
    const { affected } = await Auction.delete({
      id: auctionId,
      seller: userId,
    });
    if (affected === 0) {
      throw new NotFoundException('Not found auction');
    }
  }

  async addBid(auctionId: string, userId: string, addBidDto: AddBidDto) {
    const auction = await this.findOne(auctionId);
    if (+auction.endDate < +new Date()) {
      throw new BadRequestException('Auction is finished');
    }
    if (auction.price > addBidDto.price) {
      throw new BadRequestException('prise is too low');
    }
    const bids = JSON.parse(auction.bids || '[]');
    const newBid = { user: userId, price: addBidDto.price };
    console.log(typeof bids);

    auction.bids = JSON.stringify(bids.push(newBid));
    await auction.save();
    return;
  }
}
