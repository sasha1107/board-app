import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "@/auth/auth.service";
import { AuthCredentialDto } from "@/auth/dto/auth-credential.dto";
import { GetUser } from "@/auth/get-user.decorator";
import type { User } from "@/auth/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post("/signin")
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto);
  }

  @Post("/guard-test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
