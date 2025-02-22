import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsController } from "@/boards/boards.controller";
import { BoardsService } from "@/boards/boards.service";
import { BoardRepository } from "@/boards/board.repositiry";
import { AuthModule } from "@/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
