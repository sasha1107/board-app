import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { UserRepository } from "@/auth/user.repository";
import { JwtStrategy } from "@/auth/jwt.strategy";
import * as config from "config";

const jwtConfig = config.get<{
  secret: string;
  expiresIn: number;
}>("jwt");

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy], // 이 모듈에서 사용할 수 있도록 등록
  exports: [JwtStrategy, PassportModule], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class AuthModule {}
