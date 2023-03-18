import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../user/model/user.entity';

@Module({
  imports: [NestJwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}
