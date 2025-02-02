import { Controller, Get } from "@nestjs/common";
import { BoardsService } from "@/boards/boards.service";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }
}
