import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auction } from './models/auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionService } from './auction.service';
import { AuthGuard } from '../guards/auth-guard/AuthGuard.guards';
import { AuthorisedRequest } from '../types/request/request.type';
import { AddBidDto } from './dto/bid/add-bid.dto';

@ApiTags('Auction')
@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [Auction],
  })
  getAll() {
    return this.auctionService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Auction,
  })
  @ApiResponse({
    status: 404,
    description: 'Auction not found',
  })
  async findOne(@Param('id') id: string) {
    return this.auctionService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateAuctionDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Auction,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  create(
    @Request() request: AuthorisedRequest,
    @Body() createAuctionDto: CreateAuctionDto,
  ) {
    return this.auctionService.create(request.user.id, createAuctionDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateAuctionDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Auction,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Auction not found',
  })
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return {};
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found auction',
  })
  delete(@Request() request: AuthorisedRequest, @Param('id') id: string) {
    return this.auctionService.delete(request.user.id, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':id/bid')
  addBid(
    @Param('id') auctionId: string,
    @Request() request: AuthorisedRequest,
    @Body() addBidDto: AddBidDto,
  ) {
    const userId = request.user.id;
    return this.auctionService.addBid(auctionId, userId, addBidDto);
  }
}
