import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { BoardsService } from "@/boards/boards.service";
import type { CreateBoardDto } from "@/boards/dto/create-board.dto";
import { BoardStatus } from "@/boards/board-status.enum";
import { BoardStatusValidationPipe } from "@/boards/pipes/board-status.validation.pipe";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Post("/")
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDto) {
    return this.boardsService.createBoard(body);
  }

  @Get("/:id")
  getBoardById(@Param("id", ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
