import { Repository, DataSource } from "typeorm";
import { User } from "@/auth/user.entity";
import { AuthCredentialDto } from "@/auth/dto/auth-credential.dto";
import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === "23505") {
        throw new ConflictException("Existing username");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
