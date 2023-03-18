import { NestFactory } from '@nestjs/core';
import { AuctionModule } from './auction.module';

async function bootstrap() {
  const app = await NestFactory.create(AuctionModule);
  await app.listen(3000);
}
bootstrap();
