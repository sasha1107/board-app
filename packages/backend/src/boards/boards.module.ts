import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsController } from "@/boards/boards.controller";
import { BoardsService } from "@/boards/boards.service";
import { BoardRepository } from "@/boards/board.repositiry";

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
