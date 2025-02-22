import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { UserRepository } from "@/auth/user.repository";
import { AuthCredentialDto } from "@/auth/dto/auth-credential.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await compare(password, user.password))) {
      // 토큰 발행 (secret + payload)
      const payload = { username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("login failed");
    }
  }
}
