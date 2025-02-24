import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BoardsService } from "@/boards/boards.service";
import { CreateBoardDto } from "@/boards/dto/create-board.dto";
import { BoardStatus } from "@/boards/board-status.enum";
import { BoardStatusValidationPipe } from "@/boards/pipes/board-status.validation.pipe";
import { GetUser } from "@/auth/get-user.decorator";
import type { User } from "@/auth/user.entity";

@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Post("/")
  createBoard(
    @Body(ValidationPipe) body: CreateBoardDto,
    @GetUser() user: User,
  ) {
    return this.boardsService.createBoard(body, user);
  }

  @Get("/:id")
  getBoardById(@Param("id", ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number, @GetUser() user: User) {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
