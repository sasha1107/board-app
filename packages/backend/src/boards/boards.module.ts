import { Module } from "@nestjs/common";
import { BoardsController } from "@/boards/boards.controller";

@Module({
  controllers: [BoardsController],
})
export class BoardsModule {}
