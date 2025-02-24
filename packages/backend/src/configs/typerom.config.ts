import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

const dbConfig = config.get<{
  type: "postgres";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}>("db");

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: parseInt(process.env.RDS_PORT || dbConfig.port.toString()),
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: dbConfig.synchronize,
};
