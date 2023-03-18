import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';

describe('AuctionController', () => {
  let auctionController: AuctionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuctionController],
      providers: [AuctionService],
    }).compile();

    auctionController = app.get<AuctionController>(AuctionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(auctionController.getHello()).toBe('Hello World!');
    });
  });
});
