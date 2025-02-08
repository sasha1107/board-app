import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BoardsService } from "@/boards/boards.service";
import type { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board.model";

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
  getBoardById(@Param("id") id: string) {
    return this.boardsService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoard(@Param("id") id: string) {
    this.boardsService.deleteBoard(id);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id") id: string,
    @Body("status") status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
