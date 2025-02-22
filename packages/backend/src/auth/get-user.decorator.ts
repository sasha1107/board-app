import { createParamDecorator } from "@nestjs/common";
import type { User } from "@/auth/user.entity";

export const GetUser = createParamDecorator((_data, ctx) => {
  const req = ctx.switchToHttp().getRequest<{ user: User }>();
  return req.user;
});
