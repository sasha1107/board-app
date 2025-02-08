import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus, type Board } from "./board.model";
import { v1 as uuid } from "uuid";
import type { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(dto: CreateBoardDto) {
    const { title, description } = dto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string) {
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  deleteBoard(id: string) {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const board = this.getBoardById(id);
    if (!board) {
      throw new Error(`Can't find Board with id ${id}`);
    }
    board.status = status;
    return board;
  }
}
