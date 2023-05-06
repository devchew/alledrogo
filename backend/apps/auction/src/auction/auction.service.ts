import {
  BadRequestException, Inject,
  Injectable,
  NotFoundException
} from "@nestjs/common";

import { Auction } from "./models/auction.entity";
import { CreateAuctionDto } from "./dto/create-auction.dto";
import { AddBidDto } from "./dto/bid/add-bid.dto";
import { Bid } from "../types/bid/bid.type";
import { UpdateAuctionDto } from "./dto/update-auction.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuctionService {


  constructor(@Inject(UserService) private userService: UserService) {
  }

  getBids(auction: Auction): Bid[] {
    return auction.bids === null ? [] : JSON.parse(auction.bids);
  }

  async checkEndDate(auction: Auction) {
    if (+auction.endDate < +new Date()) {
      auction.status = true;
      await auction.save();
    }
  }

  async findAll() {
    const auctions = await Auction.find({ where: { status: false } });
    const checkedAuctionDate = auctions.map((auction) => {
      this.checkEndDate(auction);
      return {
        ...auction,
        bids: this.getBids(auction)
      };
    });
    return checkedAuctionDate.filter(auction => auction.status == false);
  }

  setBids(auction: Auction, bids: Bid[]) {
    auction.bids = JSON.stringify(bids);
  }

  async findOne(id: string) {
    const auction = await Auction.findOne({
      where: { id }
    });
    if (auction === null) throw new NotFoundException('Nie znaleziono aukcji');
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
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    const createAuction = Auction.create({
      ...createAuctionDto,
      seller: userId,
      endDate
    });
    return await createAuction.save();
  }

  async delete(userId: string, auctionId: string) {
    const { affected } = await Auction.delete({
      id: auctionId,
      seller: userId
    });
    if (affected === 0) {
      throw new NotFoundException("Nie znaleziono aukcji");
    }
  }

  async addBid(auctionId: string, userId: string, addBidDto: AddBidDto) {
    const auction = await this.findOne(auctionId);
    const user = await this.userService.findOneUser(userId);

    if (auction.seller == userId) throw new BadRequestException("Nie możesz licytować własnej aukcji...");

    if (auction.status) {
      throw new BadRequestException("Aukcja jest już zakończona");
    }
    if (auction.price >= addBidDto.price) {
      throw new BadRequestException("Twoja oferta jest za niska");
    }
    const bids = this.getBids(auction);
    const newBid = {
      userId: userId,
      price: addBidDto.price,
      date: new Date(),
      name: user.firstName
    };
    bids.push(newBid);
    auction.price = addBidDto.price;
    this.setBids(auction, bids);
    await auction.save();
    return;
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto, sellerId: string) {
    let auctionToBeUpdate = await this.findOne(id);
    if (sellerId !== auctionToBeUpdate.seller) throw new BadRequestException('Brak dostępu');
    auctionToBeUpdate = { ...auctionToBeUpdate, ...updateAuctionDto } as Auction;
    await Auction.update({ id }, { ...updateAuctionDto });

    return auctionToBeUpdate;
  }
}
