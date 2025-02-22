import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcryptjs";
import { UserRepository } from "@/auth/user.repository";
import { AuthCredentialDto } from "@/auth/dto/auth-credential.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await compare(password, user.password))) {
      return "login success";
    } else {
      throw new UnauthorizedException("login failed");
    }
  }
}
