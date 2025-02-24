import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardStatus } from "@/boards/board-status.enum";
import type { CreateBoardDto } from "@/boards/dto/create-board.dto";
import { BoardRepository } from "@/boards/board.repositiry";
import type { User } from "@/auth/user.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards() {
    return this.boardRepository.getAllBoards();
  }

  createBoard(dto: CreateBoardDto, user: User) {
    return this.boardRepository.createBoard(dto, user);
  }

  getBoardById(id: number) {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoard(id: number) {
    return this.boardRepository.deleteBoard(id);
  }

  updateBoardStatus(id: number, status: BoardStatus) {
    return this.boardRepository.updateBoardStatus(id, status);
  }
}
