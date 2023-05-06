import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';

@Injectable()
export class JwtService {
  constructor(private nestJwtService: NestJwtService) {}

  sign(id: string, extendExpiration = false) {
    return this.nestJwtService.sign(
      { id },
      { expiresIn: extendExpiration ? '30d' : '30d', secret: JWT_SECRET },
    );
  }
}
