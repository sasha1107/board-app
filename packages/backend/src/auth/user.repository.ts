import { Repository, DataSource } from "typeorm";
import { User } from "@/auth/user.entity";
import { AuthCredentialDto } from "@/auth/dto/auth-credential.dto";
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
