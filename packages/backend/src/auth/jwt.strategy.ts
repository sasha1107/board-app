import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"; // passport-jwt 모듈에서 제공하는 Strategy 사용
import { UserRepository } from "@/auth/user.repository";
import * as config from "config";

const jwtConfig = config.get<{
  secret: string;
  expiresIn: number;
}>("jwt");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret, // 토큰 검증 시 사용할 secret
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰 추출
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
