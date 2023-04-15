import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Auction } from './models/auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AddBidDto } from './dto/bid/add-bid.dto';
import { Bid } from '../types/bid/bid.type';

@Injectable()
export class AuctionService {
  getBids(auction: Auction): Bid[] {
    return JSON.parse(auction.bids);
  }

  async checkEndDate(auction: Auction) {
    if (+auction.endDate < +new Date()) {
      auction.status = true;
      await auction.save();
    }
  }
  async findAll() {
    const auctions = await Auction.find();
    const checkedAuctionDate = auctions.map((auction) => {
      if (auction.status === false) this.checkEndDate(auction);
      return {
        ...auction,
        bids: this.getBids(auction),
      };
    });
    return checkedAuctionDate;
  }

  setBids(auction: Auction, bids: Bid[]) {
    auction.bids = JSON.stringify(bids);
  }
  async findOne(id: string) {
    const auction = await Auction.findOne({
      where: { id },
    });
    if (auction === null) throw new NotFoundException();
    if (auction.status === false) await this.checkEndDate(auction);
    return auction;
  }

  async getOneWithBidsArray(id: string) {
    const auction = await this.findOne(id);
    const bids = this.getBids(auction);
    const auctionWithBidsArray = { ...auction, bids };
    return auctionWithBidsArray as unknown as Auction;
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
    if (auction.status) {
      throw new BadRequestException('Auction is finished');
    }
    if (auction.price >= addBidDto.price) {
      throw new BadRequestException('prise is too low');
    }
    const bids = this.getBids(auction);
    const newBid = {
      userId: userId,
      price: addBidDto.price,
      date: new Date(),
    };
    bids.push(newBid);
    auction.price = addBidDto.price;
    this.setBids(auction, bids);
    await auction.save();
    return;
  }
}
