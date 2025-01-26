import { Controller } from "@nestjs/common";
import { BoardsService } from "@/boards/boards.service";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
}
