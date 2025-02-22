import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { UserRepository } from "@/auth/user.repository";

const MINUTE = 60;

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: "Secret1234",
      signOptions: {
        expiresIn: MINUTE * 60,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
