import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { BoardsService } from "@/boards/boards.service";
import type { CreateBoardDto } from "./dto/create-board.dto";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Post("/")
  createBoard(@Body() body: CreateBoardDto) {
    return this.boardsService.createBoard(body);
  }

  @Get("/:id")
  getBoardById(@Param("id") id: string) {
    return this.boardsService.getBoardById(id);
  }
}
