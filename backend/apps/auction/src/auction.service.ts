import { Injectable } from '@nestjs/common';

@Injectable()
export class AuctionService {
  getHello(): string {
    return 'Hello World!';
  }
}
