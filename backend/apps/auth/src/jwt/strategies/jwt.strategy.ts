import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../constants";
import { RequestUser } from "../../types/request/request.type";
import { User } from "../../user/model/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    });
  }

  async validate({ id }: RequestUser): Promise<RequestUser> {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException("Brak Dostępu");
    }
    return { id };
  }
}
