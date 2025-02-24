import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as config from "config";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const { port } = config.get<{ port: number }>("server");
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
